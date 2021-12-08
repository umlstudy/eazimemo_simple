import { MemoDao } from "@sejong/dao";
import { MemoModel } from "@sejong/model";
import { AbsBiz } from "./AbsBiz";

export abstract class AbsMemoBiz extends AbsBiz<MemoModel> {

    protected static readonly memoDao = MemoDao.INS;

}
