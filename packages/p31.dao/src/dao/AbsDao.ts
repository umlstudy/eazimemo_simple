import { AbsModel } from "@sejong/model";
import { Knex } from "knex";
export abstract class AbsDao<M extends AbsModel> {

    protected abstract getTableName(): string;

    protected abstract whereByPrimaryKey(table: any, model: M): Promise<any>;

    public async insert(trx: Knex.Transaction<any, any[]>, model: M): Promise<Knex.QueryBuilder<any, number[]>> {
        const tableName = this.getTableName();
        return trx.table(tableName).insert(model);
    }

    public async update(trx: Knex.Transaction<any, any[]>, model: M): Promise<Knex.QueryBuilder<any, number[]>> {
        const tableName = this.getTableName();
        return trx.table(tableName).update(model);
    }

    public async delete(trx: Knex.Transaction<any, any[]>, model: M): Promise<Knex.QueryBuilder<any, number[]>> {
        const tableName = this.getTableName();
        return (await this.whereByPrimaryKey(trx.table(tableName), model)).del();
    }

    public async selectFirst(knex: Knex): Promise<M | null> {
        const tableName = this.getTableName();
        const selected = await knex.select()
            .from<M>(tableName).limit(1);
        return selected.length > 0 ? selected[0] as M : null;
    }

    public async selectById(knex: Knex, model: M): Promise<M | null> {
        const tableName = this.getTableName();
        const selected = await this.whereByPrimaryKey(knex.select()
            .from<M>(tableName), model);
        return selected.length > 0 ? selected[0] as M : null;
    }
}