import { MemoModel } from "@sejong/model";
import { AbsIdBaseDao } from "./AbsIdBaseDao";

// 자동생성된 코드
export abstract class AbsMemoDao extends AbsIdBaseDao<MemoModel> {

    protected getTableName(): string {
        return "Memo";
    }
}