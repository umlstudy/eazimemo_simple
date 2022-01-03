import { UserModel } from "@sejong/model";
import { AbsIdBaseDao } from "./AbsIdBaseDao";

// 자동생성된 코드
export abstract class AbsUserDao extends AbsIdBaseDao<UserModel> {

    protected getTableName(): string {
        return "user";
    }
}
