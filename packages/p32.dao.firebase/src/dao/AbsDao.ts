import { AbsModel } from "@sejong/model";
import { doc, WriteBatch } from "firebase/firestore/lite";

export abstract class AbsDao<M extends AbsModel> {

    protected abstract getTableName(): string;

    public abstract getCountColumn(): string;

    protected abstract whereByPrimaryKey(queryBuilder: Knex.QueryBuilder, model: M): Knex.QueryBuilder;

    public async insert(writeBatch: WriteBatch, model: M): Promise<number> {

        const memo1Ref = doc(writeBatch., this.getTableName(), "memo1");
        batch.set(memo1Ref, { message: "create1" });
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
        const queryBuilder = this.selectQueryBuilder(knex, model);
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

    public async selectFirst(model: AbsModel = {} as AbsModel)
        : Promise<M | null> {
        const limitOne = await this.limit(knex, 1, model);
        return limitOne.length > 0 ? limitOne[0] as M : null;
    }

    public async selectList(model: M)
        : Promise<M[]> {
        return await this.select(knex, model);
    }

    public limit(knex: Knex, limitCnt:number, model:AbsModel={} as AbsModel)
        : Knex.QueryBuilder {
        const qb = this.selectQueryBuilder(knex, model as M).limit(limitCnt);
        return qb;
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