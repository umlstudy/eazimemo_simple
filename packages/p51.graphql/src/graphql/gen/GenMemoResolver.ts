
import { MemoBiz } from "@sejong/biz";
import { AbsDao } from "@sejong/dao.firebase";
import { TranObjectOwner } from "@sejong/model";

// 자동 생성된 코드

// https://www.tutorialspoint.com/graphql/graphql_resolver.htm
export const GenMemoResolver = {
  Query: {
    getMemoByPrimaryKey: async (root: any, args: any) => getMemoByPrimaryKey(root, args),
  },
  Mutation: {
    addMemo: async (root: any, args: any) => await addMemo(root, args),
    removeMemo: async (root: any, args: any) => await removeMemo(root, args),
    updateMemo: async (root: any, args: any) => await updateMemo(root, args),
  }
};

const getMemoByPrimaryKey = async (root: any, args: any) => {
  console.log(root);
  const { memo } = args;
  return await MemoBiz.INS.getMemoByPrimaryKey(memo);
}

const addMemo = async (root: any, args: any) => {
  console.log(root);
  const { memo } = args;
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const memoAdded = await MemoBiz.INS.addMemo(too, memo);

    return memoAdded;
  });
  return result;
}

const removeMemo = async (root: any, args: any) => {
  console.log(root);
  const { memo } = args;
  const result = await knexConnection.transaction(async trx => {
    const memoRemoved = await MemoBiz.INS.removeMemo(trx, memo);
    return memoRemoved;
  });
  return result;
}

const updateMemo = async (root: any, args: any) => {
  console.log(root);
  const { memo } = args;
  const result = await knexConnection.transaction(async trx => {
    const memoUpdated = await MemoBiz.INS.updateMemo(trx, memo);
    return memoUpdated;
  });
  return result;
}