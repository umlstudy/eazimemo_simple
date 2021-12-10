import { SjAssertUtil } from "@sejong/common";
import { AbsDao, UserDao } from "@sejong/dao";
import { UserModel } from "@sejong/model";
import { Knex } from "knex";
import { AbsUserBiz } from "./AbsUserBiz";

// 자동생성된 코드
export class UserBiz extends AbsUserBiz {

    public static readonly INS = new UserBiz();

    protected getAbsDao(): AbsDao<UserModel> {
        return UserDao.INS;
    }

    protected validate4Insert(model: UserModel): void {
        SjAssertUtil.mustNotNull(model, "model is null");
    }

    public async getUserByPrimaryKey(knex: Knex, model: UserModel)
        : Promise<UserModel | null> {
        const result = await this.selectById(knex, model);
        return result;
    }

    public async addUser(trx: Knex.Transaction<any, any[]>, model: UserModel)
        : Promise<UserModel> {
        const id = await this.insert(trx, model);
        const result = await this.getUserByPrimaryKey(trx, { id: id } as UserModel);
        return result!;
    }

    public async removeUser(trx: Knex.Transaction<any, any[]>, model: UserModel)
        : Promise<UserModel> {
        const result = await this.getUserByPrimaryKey(trx, model);
        await this.delete(trx, model);
        return result!;
    }

    public async updateUser(trx: Knex.Transaction<any, any[]>, model: UserModel)
        : Promise<UserModel> {
        await this.update(trx, model);
        const result = await this.getUserByPrimaryKey(trx, model);
        return result!;
    }
}
