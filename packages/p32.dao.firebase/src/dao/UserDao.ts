import { UserModel } from "@sejong/model";
import { AbsUserDao } from "./AbsUserDao";

export class UserDao extends AbsUserDao {

    // 자동생성된 코드 시작
    public static readonly INS = new UserDao();

    protected async joining(selected: UserModel[]): Promise<UserModel[]> {
        return selected;
    }
    // 자동생성된 코드 끝
}
