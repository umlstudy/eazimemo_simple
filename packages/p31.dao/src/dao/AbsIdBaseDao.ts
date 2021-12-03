import { AbsIdBaseModel } from "@sejong/model";
import { Knex } from "knex";
import { AbsDao } from "./AbsDao";

export abstract class AbsIdBaseDao<M extends AbsIdBaseModel> extends AbsDao<M> {

    protected abstract getTableName(): string;

    public async selectById(knex: Knex, model: M) {
        const id = model.id;
        return await knex.select()
            .from<M>(this.getTableName())
            .where('id', id)
            .limit(1);
    }

    public async insert(trx: Knex.Transaction<any, any[]>, model: M) {
        await trx.table(this.getTableName()).insert(model);
    }

    public async update(trx: Knex.Transaction<any, any[]>, model: M) {
        await trx.table(this.getTableName()).update(model);
    }

    public async delete(trx: Knex.Transaction<any, any[]>, model: M) {
        const id = model.id;
        await trx.table(this.getTableName()).where('id', id).del();
    }
}