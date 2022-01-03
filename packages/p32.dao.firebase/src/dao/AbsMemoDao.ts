import { MemoModel } from "@sejong/model";
import { AbsDao } from "./AbsDao";

// 자동생성된 코드
export abstract class AbsMemoDao extends AbsDao<MemoModel> {

    protected getTableName(): string {
        return "memo";
    }
}