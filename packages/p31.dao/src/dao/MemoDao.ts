import { MemoModel } from "@sejong/model";
import { AbsIdBaseDao } from "./AbsIdBaseDao";

export class MemoDao extends AbsIdBaseDao<MemoModel> {

    public static readonly INS = new MemoDao();
    
    protected getTableName(): string {
        return "Memo";
    }
}
