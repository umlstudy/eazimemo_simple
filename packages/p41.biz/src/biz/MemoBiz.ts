import { SjAssertUtil } from "@sejong/common";
import { AbsDao, MemoDao } from "@sejong/dao";
import { MemoModel } from "@sejong/model";
import { Knex } from "knex";
import { AbsMemoBiz } from "./AbsMemoBiz";

// 자동생성된 코드
export class MemoBiz extends AbsMemoBiz {

    public static readonly INS = new MemoBiz();

    protected getAbsDao(): AbsDao<MemoModel> {
        return MemoDao.INS;
    }

    protected validate4Insert(model: MemoModel): void {
        SjAssertUtil.mustNotNull(model, "model is null");
    }

    public async getMemoByPrimaryKey(knex: Knex, model: MemoModel)
        : Promise<MemoModel | null> {
        const result = await this.selectById(knex, model);
        return result;
    }

    public async addMemo(trx: Knex.Transaction<any, any[]>, model: MemoModel)
        : Promise<MemoModel> {
        const id = await this.insert(trx, model);
        const result = await this.getMemoByPrimaryKey(trx, { id: id } as MemoModel);
        return result!;
    }

    public async removeMemo(trx: Knex.Transaction<any, any[]>, model: MemoModel)
        : Promise<MemoModel> {
        const result = await this.getMemoByPrimaryKey(trx, model);
        await this.delete(trx, model);
        return result!;
    }

    public async updateMemo(trx: Knex.Transaction<any, any[]>, model: MemoModel)
        : Promise<MemoModel> {
        await this.update(trx, model);
        const result = await this.getMemoByPrimaryKey(trx, model);
        return result!;
    }
}
