import { UserDao } from "@sejong/dao.firebase";
import { UserModel } from "@sejong/model";
import { AbsBiz } from "./AbsBiz";

// 자동생성된 코드
export abstract class AbsUserBiz extends AbsBiz<UserModel> {

    protected static readonly userDao = UserDao.INS;

}
