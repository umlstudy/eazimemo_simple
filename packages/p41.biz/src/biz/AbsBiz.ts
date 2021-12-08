import { AbsDao } from "@sejong/dao";
import { AbsModel } from "@sejong/model";

export abstract class AbsBiz<M extends AbsModel> {

    protected abstract getAbsDao(): AbsDao<M>;

    public async selectById(knex: Knex, model: M): Promise<M> {
        return this.getAbsDao().selectById(knex, model);
    }

    public async insert(trx: Knex.Transaction<any, any[]>, model: M) {
        await this.getAbsDao().insert(trx, model);
    }

    public async update(trx: Knex.Transaction<any, any[]>, model: M) {
        await this.getAbsDao().update(trx, model);
    }

    public async delete(trx: Knex.Transaction<any, any[]>, model: M) {
        await this.getAbsDao().delete(trx, model);
    }
}