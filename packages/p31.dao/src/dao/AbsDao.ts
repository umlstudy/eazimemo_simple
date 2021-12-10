import { SjAssertUtil } from "@sejong/common";
import { AbsModel } from "@sejong/model";
import { Knex } from "knex";
export abstract class AbsDao<M extends AbsModel> {

    protected abstract getTableName(): string;

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

    public async selectByDefaultFilter(knex: Knex, model: M): Promise<M[]> {
        SjAssertUtil.mustNotNull(model.filterInfo, "default filter is null");
        const filter = model.filterInfo;
        if ( !filter.fromToInfo && !filter.pageInfo ) {
            throw 'fromTo and page filter null';
        }

        const tableName = this.getTableName();
        const queryBuilder = knex.select().from<M>(tableName);

        const fromTo = filter.fromToInfo;
        if ( fromTo ) {
            if ( fromTo.from ) {
                queryBuilder.where('createAt', '>=', fromTo.from);
            }
            if (fromTo.to) {
                queryBuilder.where('createAt', '<=', fromTo.to);
            }
        }

        const page = filter.pageInfo;
        if (page) {
            const totalCount = await queryBuilder.clone().count() as number;
            const offset = page.curPagePos*page.rowsPerPage;
            if ( totalCount > offset ) {
                const data = await queryBuilder.clone().offset(offset)
                    .limit(page.rowsPerPage).select();
                return data as M[];
            } else {
                return [];
            }
        } else {
            return await queryBuilder.select() as M[];
        }
    }
}