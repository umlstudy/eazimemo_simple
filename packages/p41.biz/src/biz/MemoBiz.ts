import { AbsDao, MemoDao } from "@sejong/dao";
import { MemoModel } from "@sejong/model";
import { AbsMemoBiz } from "./AbsMemoBiz";

// 자동생성된 코드
export class MemoBiz extends AbsMemoBiz {

    public static readonly INS = new MemoBiz();

    protected getAbsDao(): AbsDao<MemoModel> {
        return MemoDao.INS;
    }
}
