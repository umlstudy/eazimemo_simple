import { AbsModel } from "@sejong/model";
import { Knex } from "knex";
export abstract class AbsDao<M extends AbsModel> {

    protected abstract getTableName(): string;

    protected abstract getCountColumn(): string;

    protected abstract whereByPrimaryKey(table: any, model: M): Promise<any>;

    public async insert(trx: Knex.Transaction<any, any[]>, model: M): Promise<number> {
        const tableName = this.getTableName();
        return await trx.table(tableName).insert(model);
    }

    public async update(trx: Knex.Transaction<any, any[]>, model: M): Promise<number> {
        const tableName = this.getTableName();
        return await trx.table(tableName).update(model);
    }

    public async delete(trx: Knex.Transaction<any, any[]>, model: M): Promise<number> {
        const tableName = this.getTableName();
        const table = await this.whereByPrimaryKey(trx.table(tableName), model);
        return table.del();
    }

    public async selectFirst(knex: Knex): Promise<M | null> {
        const tableName = this.getTableName();
        const selected = await knex.select()
            .from<M>(tableName).limit(1);
        return selected.length > 0 ? selected[0] as M : null;
    }

    public async selectById(knex: Knex, model: M): Promise<M | null> {
        const tableName = this.getTableName();
        const tbl = knex.select().from<M>(tableName);
        const selected = await this.whereByPrimaryKey(tbl, model);
        return selected.length > 0 ? selected[0] as M : null;
    }

    protected async paging(queryBuilder: Knex.QueryBuilder, model: M)
    : Promise<Knex.QueryBuilder|null> {
        const page = model.pageInfo;
        if (page) {
            const totalCountObject = await queryBuilder.clone()
                .count({ cnt: this.getCountColumn() }) as any;
            const totalCount = totalCountObject[0].cnt;
            const offset = page.curPagePos * page.rowsPerPage;
            if (totalCount > offset) {
                const clonedQueryBuilder = queryBuilder.clone();
                const offsetQueryBuilder = clonedQueryBuilder.offset(offset);
                return offsetQueryBuilder.limit(page.rowsPerPage);
            } else {
                return null;
            }
        } else {
            return queryBuilder;
        }
    }

    public async selectByDefaultFilter(knex: Knex, model: M): Promise<M[]> {
        if (!model.createdAtFromToInfo && !model.pageInfo ) {
            throw 'fromTo and page filter null';
        }

        const tableName = this.getTableName();
        const queryBuilder = knex.select().from<M>(tableName);

        const fromTo = model.createdAtFromToInfo;
        if ( fromTo ) {
            if ( fromTo.from ) {
                queryBuilder.where('createdAt', '>=', fromTo.from);
            }
            if (fromTo.to) {
                queryBuilder.where('createdAt', '<=', fromTo.to);
            }
        }

        if (model.pageInfo ) {
            const result = await this.paging(queryBuilder, model);
            if (result === null ) {
                return [];
            } else {
                return result;
            }
        } else {
            const selected = await queryBuilder.select();
            return selected as M[];
        }
    }
}