
import { MemoBiz } from "@sejong/biz";
import { SjLogUtil } from "@sejong/common";
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
  SjLogUtil.debug('getMemoByPrimaryKey...');
  const { memo } = args;
  return await MemoBiz.INS.getMemoByPrimaryKey(memo);
}

const addMemo = async (root: any, args: any) => {
  console.log(root);
  const { memo } = args;
  SjLogUtil.debug('addMemo...');
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const memoAdded = await MemoBiz.INS.addMemo(too, memo);
    return memoAdded;
  });
  return result;
}

const removeMemo = async (root: any, args: any) => {
  console.log(root);
  const { memo } = args;
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const memoRemoved = await MemoBiz.INS.removeMemo(too, memo);
    return memoRemoved;
  });
  return result;
}

const updateMemo = async (root: any, args: any) => {
  console.log(root);
  SjLogUtil.debug('updateMemo...');
  const { memo } = args;
  const result = await AbsDao.transaction(async (too:TranObjectOwner):Promise<any> => {
    const memoUpdated = await MemoBiz.INS.updateMemo(too, memo);
    return memoUpdated;
  });
  return result;
}