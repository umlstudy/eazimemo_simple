
import { UserBiz } from "@sejong/biz";
import { SjLogUtil } from "@sejong/common";
import { AbsDao } from "@sejong/dao.firebase";
import { TranObjectOwner } from "@sejong/model";

// 자동 생성된 코드

// https://www.tutorialspoint.com/graphql/graphql_resolver.htm
export const GenUserResolver = {
  Query: {
    getUserByPrimaryKey: async (root: any, args: any) => getUserByPrimaryKey(root, args),
    getUserList: async (root: any, args: any) => getUserList(root, args),
  },
  Mutation: {
    addUser: async (root: any, args: any) => await addUser(root, args),
    removeUser: async (root: any, args: any) => await removeUser(root, args),
    updateUser: async (root: any, args: any) => await updateUser(root, args),
  }
};

const getUserByPrimaryKey = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  return await UserBiz.INS.getUserByPrimaryKey(user);
}

const getUserList = async (root: any, args: any) => {
  console.log(root);
  SjLogUtil.debug('getUserList...');
  const { user } = args;
  return await UserBiz.INS.getUserList(user);
}

const addUser = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const userAdded = await UserBiz.INS.addUser(too, user);
    return userAdded;
  });
  return result;
}

const removeUser = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const userRemoved = await UserBiz.INS.removeUser(too, user);
    return userRemoved;
  });
  return result;
}

const updateUser = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const userUpdated = await UserBiz.INS.updateUser(too, user);
    return userUpdated;
  });
  return result;
}