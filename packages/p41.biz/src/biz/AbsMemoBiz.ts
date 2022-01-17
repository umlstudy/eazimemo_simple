import { SjAssertUtil } from "@sejong/common";
import { AbsDao, MemoDao } from "@sejong/dao.firebase";
import { MemoModel, TranObjectOwner } from "@sejong/model";
import { AbsBiz } from "./AbsBiz";

export abstract class AbsMemoBiz extends AbsBiz<MemoModel> {

    // 자동생성된 코드_시작
    protected static readonly memoDao = MemoDao.INS;

    protected getAbsDao(): AbsDao<MemoModel> {
        return MemoDao.INS;
    }

    protected validate4Insert(model: MemoModel): void {
        SjAssertUtil.mustNotNull(model, "model is null");
    }

    public async getMemoByPrimaryKey(model: MemoModel)
        : Promise<MemoModel | null> {
        const result = await this.selectById(model);
        return result;
    }
    
    public async getMemoList(model: MemoModel): Promise<MemoModel[]> {
        const result = await this.selectList(model);
        return result;
    }

    public async addMemo(too: TranObjectOwner, model: MemoModel)
        : Promise<MemoModel> {
        const id = await this.insert(too, model);
        const result = await this.getMemoByPrimaryKey({ id: id.toString() } as MemoModel);
        return result!;
    }

    public async removeMemo(too: TranObjectOwner, model: MemoModel)
        : Promise<MemoModel> {
        const result = await this.getMemoByPrimaryKey(model);
        await this.delete(too, model);
        return result!;
    }

    public async updateMemo(too: TranObjectOwner, model: MemoModel)
        : Promise<MemoModel> {
        await this.update(too, model);
        const result = await this.getMemoByPrimaryKey(model);
        return result!;
    }
    // 자동생성된 코드_종료
}
