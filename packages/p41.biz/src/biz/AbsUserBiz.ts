import { SjAssertUtil } from "@sejong/common";
import { AbsDao, UserDao } from "@sejong/dao.firebase";
import { UserModel, TranObjectOwner } from "@sejong/model";
import { AbsBiz } from "./AbsBiz";

export abstract class AbsUserBiz extends AbsBiz<UserModel> {

    // 자동생성된 코드_시작
    protected static readonly userDao = UserDao.INS;

    protected getAbsDao(): AbsDao<UserModel> {
        return UserDao.INS;
    }

    protected validate4Insert(model: UserModel): void {
        SjAssertUtil.mustNotNull(model, "model is null");
    }

    public async getUserByPrimaryKey(model: UserModel)
        : Promise<UserModel | null> {
        const result = await this.selectById(model);
        return result;
    }
    
    public async getUserList(model: UserModel): Promise<UserModel[]> {
        const result = await this.selectList(model);
        return result;
    }

    public async addUser(too: TranObjectOwner, model: UserModel)
        : Promise<UserModel> {
        const id = await this.insert(too, model);
        const result = await this.getUserByPrimaryKey({ id: id.toString() } as UserModel);
        return result!;
    }

    public async removeUser(too: TranObjectOwner, model: UserModel)
        : Promise<UserModel> {
        const result = await this.getUserByPrimaryKey(model);
        await this.delete(too, model);
        return result!;
    }

    public async updateUser(too: TranObjectOwner, model: UserModel)
        : Promise<UserModel> {
        await this.update(too, model);
        const result = await this.getUserByPrimaryKey(model);
        return result!;
    }
    // 자동생성된 코드_종료
}
