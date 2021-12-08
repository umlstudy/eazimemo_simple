import { AbsDao, MemoDao } from "@sejong/dao";
import { MemoModel } from "@sejong/model";
import { AbsMemoBiz } from "./AbsMemoBiz";

export class MemoBiz extends AbsMemoBiz {

    public static readonly INS = new MemoBiz();

    protected getAbsDao(): AbsDao<MemoModel> {
        return MemoDao.INS;
    }
}
