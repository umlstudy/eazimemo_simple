import { MemoDao } from "@sejong/dao.firebase";
import { MemoModel } from "@sejong/model";
import { AbsBiz } from "./AbsBiz";

// 자동생성된 코드
export abstract class AbsMemoBiz extends AbsBiz<MemoModel> {

    protected static readonly memoDao = MemoDao.INS;

}
