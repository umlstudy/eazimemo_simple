import { MemoModel } from "@sejong/model";
import { Knex } from "knex";

export class MemoDao extends AbsDao {

    public static INS = new MemoDao();
    
    protected getTableName(): string {
        return "Memo";
    }

    public async selectById(knex: Knex, memoModel: MemoModel) {
        return await knex.select()
            .from<MemoModel>(this.getTableName())
            .where({id:memoModel.id})
            .limit(1);
    }

    public async insert(trx: Knex.Transaction<any, any[]>, memoModel: MemoModel) {
        await trx.insert(memoModel);
    }
}
