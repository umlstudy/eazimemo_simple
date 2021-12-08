import { AbsDao } from "@sejong/dao";
import { AbsModel } from "@sejong/model";
import { Knex } from "knex";

export abstract class AbsBiz<M extends AbsModel> {

    protected abstract getAbsDao(): AbsDao<M>;

    public async selectById(knex: Knex, model: M): Promise<M | null> {
        return this.getAbsDao().selectById(knex, model);
    }

    public async selectFirst(knex: Knex): Promise<M | null> {
        return this.getAbsDao().selectFirst(knex);
    }

    public async insert(trx: Knex.Transaction<any, any[]>, model: M): Promise<number> {
        return await this.getAbsDao().insert(trx, model);
    }

    public async update(trx: Knex.Transaction<any, any[]>, model: M): Promise<number> {
        return await this.getAbsDao().update(trx, model);
    }

    public async delete(trx: Knex.Transaction<any, any[]>, model: M): Promise<number> {
        return await this.getAbsDao().delete(trx, model);
    }
}