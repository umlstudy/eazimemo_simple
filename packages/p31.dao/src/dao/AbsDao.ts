import { AbsModel } from "@sejong/model";
import { Knex } from "knex";

export abstract class AbsDao<M extends AbsModel> {

    protected abstract getTableName(): string;

    public abstract getCountColumn(): string;

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

    public async selectByPrimaryKey(knex: Knex, model: M): Promise<M | null> {
        const tableName = this.getTableName();
        const tbl = knex.select().from<M>(tableName);
        const selected = await this.whereByPrimaryKey(tbl, model);
        return selected.length > 0 ? selected[0] as M : null;
    }

    protected where(queryBuilder: Knex.QueryBuilder, model:M): Knex.QueryBuilder {
        console.log(model);
        return queryBuilder;
    }

    protected joining(queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder {
        return queryBuilder;
    }

    protected orderBy(queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder {
        return queryBuilder;
    }

    protected groupBy(queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder {
        return queryBuilder;
    }

    private static paging(queryBuilder: Knex.QueryBuilder, model: AbsModel, totalRowCount:number)
            : Knex.QueryBuilder {
        const page = model.pageInfo;
        if (page) {
            const offset = page.curPagePos * page.rowsPerPage;
            if (totalRowCount > offset) {
                const offsetQueryBuilder = queryBuilder.offset(offset);
                return offsetQueryBuilder.limit(page.rowsPerPage);
            } else {
                // 강제로 쿼리결과가 0건이 되도록 조건설 설정함
                return queryBuilder.whereRaw('1=2');
            }
        } else {
            return queryBuilder;
        }
    }

    private static fromTo(queryBuilder: Knex.QueryBuilder, model: AbsModel)
        : Knex.QueryBuilder {
        const fromTo = model.createdAtFromToInfo;
        if (fromTo) {
            if (fromTo.from) {
                queryBuilder.where('createdAt', '>=', fromTo.from);
            }
            if (fromTo.to) {
                queryBuilder.where('createdAt', '<=', fromTo.to);
            }
        }

        return queryBuilder;
    }

    public async selectFirst(knex: Knex, model: AbsModel = {} as AbsModel)
        : Promise<M | null> {
        return this.limit(knex, 1, model);
    }

    public async limit(knex: Knex, limitCnt:number, model:AbsModel={} as AbsModel)
        : Promise<M | null> {
        const selected = this.selectQueryBuilder(knex, model as M);
        const limitOne = await selected.limit(limitCnt);
        return limitOne.length > 0 ? limitOne[0] as M : null;
    }

    public async select(knex: Knex, model: M)
        : Promise<Knex.QueryBuilder> {
        let queryBuilder = this.selectQueryBuilder(knex, model);

        // 페이징
        const page = model.pageInfo;
        if (page) {
            const totalCountObject = await queryBuilder.clone()
                .count({ cnt: this.getCountColumn() }) as any;
            const totalRowCount = totalCountObject[0].cnt;
            if (totalRowCount > 0) {
                queryBuilder = AbsDao.paging(queryBuilder, model, totalRowCount);
            }
        }

        return queryBuilder;
    }

    public selectQueryBuilder(knex: Knex, model: M)
        : Knex.QueryBuilder {
        const tableName = this.getTableName();
        let queryBuilder = knex.select().from<M>(tableName)
            .whereRaw('1=1');

        // 페이징
        queryBuilder = AbsDao.fromTo(queryBuilder, model);
        
        // 조건절
        queryBuilder = this.where(queryBuilder, model);

        // 조인절
        queryBuilder = this.joining(queryBuilder);

        // orderBy
        queryBuilder = this.orderBy(queryBuilder);

        // groupBy
        queryBuilder = this.groupBy(queryBuilder);

        return queryBuilder;
    }
}