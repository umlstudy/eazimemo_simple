import { AbsModel, TranObjectOwner } from "@sejong/model";
import { Knex } from "knex";
import { knexConnection } from "../KnexConfig";

export abstract class AbsDao<M extends AbsModel> {

    public static async transaction(
        codePart: (tranObjectOwner: TranObjectOwner) => Promise<any>)
        : Promise<any> {
        const result = knexConnection.transaction(async trx => {
            const tranObjectOwner = new TranObjectOwner(trx);
            await codePart(tranObjectOwner);
        });
        return result;
    }

    protected abstract getTableName(): string;

    public abstract getCountColumn(): string;

    protected abstract whereByPrimaryKey(queryBuilder: Knex.QueryBuilder, model: M): Knex.QueryBuilder;

    public async insert(tranObjectOwner: TranObjectOwner, model: M): Promise<number> {
        const trx = tranObjectOwner.getTranObject() as Knex.Transaction<any, any[]>;
        const tableName = this.getTableName();
        return await trx.table(tableName).insert(model);
    }

    public async update(tranObjectOwner: TranObjectOwner, model: M): Promise<number> {
        const trx = tranObjectOwner.getTranObject() as Knex.Transaction<any, any[]>;
        const tableName = this.getTableName();
        return await trx.table(tableName).update(model);
    }

    public async delete(tranObjectOwner: TranObjectOwner, model: M): Promise<number> {
        const trx = tranObjectOwner.getTranObject() as Knex.Transaction<any, any[]>;
        const tableName = this.getTableName();
        const table = await this.whereByPrimaryKey(trx.table(tableName), model);
        return table.del();
    }

    public async selectByPrimaryKey(model: M): Promise<M | null> {
        const queryBuilder = this.selectQueryBuilder(model);
        const selected = await this.whereByPrimaryKey(queryBuilder, model);
        return selected.length > 0 ? selected[0] as M : null;
    }

    protected selectColumns(queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder {
        return queryBuilder;
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

    private fromTo(queryBuilder: Knex.QueryBuilder, model: AbsModel)
        : Knex.QueryBuilder {
        const tableName = this.getTableName();
        const fromTo = model.createdAtFromToInfo;
        if (fromTo) {
            if (fromTo.from) {
                queryBuilder.where(tableName +'.createdAt', '>=', fromTo.from);
            }
            if (fromTo.to) {
                queryBuilder.where(tableName +'.createdAt', '<=', fromTo.to);
            }
        }

        return queryBuilder;
    }

    public async selectFirst(model: AbsModel = {} as AbsModel)
        : Promise<M | null> {
        const limitOne = await this.limit(1, model);
        return limitOne.length > 0 ? limitOne[0] as M : null;
    }

    public async selectList(model: M)
        : Promise<M[]> {
        return await this.select(model);
    }

    public limit(limitCnt:number, model:AbsModel={} as AbsModel)
        : Knex.QueryBuilder {
        const qb = this.selectQueryBuilder(model as M).limit(limitCnt);
        return qb;
    }

    public async select(model: M)
        : Promise<Knex.QueryBuilder> {
        let queryBuilder = this.selectQueryBuilder(model);

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

    public selectQueryBuilder(model: M)
        : Knex.QueryBuilder {
        const tableName = this.getTableName();
        let queryBuilder = knexConnection.select().from<M>(tableName)
            .whereRaw('1=1');

        // 페이징
        queryBuilder = this.fromTo(queryBuilder, model);
        
        // 조건절
        queryBuilder = this.where(queryBuilder, model);

        // 조인절
        queryBuilder = this.joining(queryBuilder);

        // orderBy
        queryBuilder = this.orderBy(queryBuilder);

        // groupBy
        queryBuilder = this.groupBy(queryBuilder);

        // selectColumns
        queryBuilder = this.selectColumns(queryBuilder);

        return queryBuilder;
    }
}