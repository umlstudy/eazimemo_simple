import { MemoModel } from "@sejong/model";
import { Knex } from "knex";

class MemoDao {

    public async selectById(knex: Knex, memoModel: MemoModel) {
        return await knex.select()
            .from<MemoModel>('Memo')
            .where({id:memoModel.id})
            .limit(1);
    }

    public async insert(knex: Knex, memoModel: MemoModel) {
        return await knex.select()
            .from<MemoModel>('Memo')
            .where({ id: memoModel.id })
            .limit(1);
    }

}