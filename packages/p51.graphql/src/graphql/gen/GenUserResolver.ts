
import { UserBiz } from "@sejong/biz";
import { knexConnection } from "@sejong/dao";

// 자동 생성된 코드

// https://www.tutorialspoint.com/graphql/graphql_resolver.htm
export const GenUserResolver = {
  Query: {
    getUserByPrimaryKey: async (root: any, args: any) => getUserByPrimaryKey(root, args),
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
  return await UserBiz.INS.getUserByPrimaryKey(knexConnection, user);
}

const addUser = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  const result = await knexConnection.transaction(async trx => {
    const userAdded = await UserBiz.INS.addUser(trx, user);
    return userAdded;
  });
  return result;
}

const removeUser = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  const result = await knexConnection.transaction(async trx => {
    const userRemoved = await UserBiz.INS.removeUser(trx, user);
    return userRemoved;
  });
  return result;
}

const updateUser = async (root: any, args: any) => {
  console.log(root);
  const { user } = args;
  const result = await knexConnection.transaction(async trx => {
    const userUpdated = await UserBiz.INS.updateUser(trx, user);
    return userUpdated;
  });
  return result;
}