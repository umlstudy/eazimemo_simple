import { UserModel } from "@sejong/model";
import { AbsDao } from "./AbsDao";

// 자동생성된 코드
export abstract class AbsUserDao extends AbsDao<UserModel> {

    protected getTableName(): string {
        return "User";
    }
}