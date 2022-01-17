import { UserListModel, UserModel } from "@sejong/model";
import { AbsIdBaseDao } from "./AbsIdBaseDao";

// 자동생성된 코드
export abstract class AbsUserDao extends AbsIdBaseDao<UserModel> {

    protected getTableName(): string {
        return "user";
    }

    protected createListModel(elements: UserModel[]): UserListModel {
        return { models:elements } as UserListModel;
    }
}