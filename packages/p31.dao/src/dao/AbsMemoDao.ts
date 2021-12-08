import { MemoModel } from "@sejong/model";
import { AbsIdBaseDao } from "./AbsIdBaseDao";

export abstract class AbsMemoDao extends AbsIdBaseDao<MemoModel> {

    protected getTableName(): string {
        return "Memo";
    }
}
