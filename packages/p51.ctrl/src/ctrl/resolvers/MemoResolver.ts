
import { MemoBiz } from "@sejong/biz";
import { knexConnection } from "@sejong/dao";
import { MemoModel } from "@sejong/model";
import { gql } from "apollo-server-core";

//1.
export const MemoSchema = gql`
  type Memo {
    id: Int!
    message : String!
    createdAt: Int!
    updatedAt: Int!
  }
  type Query
  {
    getMemoByPrimaryKey(id: Int!): Memo
  }
  type Mutation {
    addMemo(message: String!): Memo!
  }
`;

//2.
const memos = [
] as MemoModel[];

//3.
export const MemoResolver = {
  Query: {
    getMemoByPrimaryKey: async (root: any, args: any) => getMemoByPrimaryKey(root, args),
  },
  Mutation: {
    addMemo: async (root: any, args: any) => await addMemo(root, args),
  }
};

const getMemoByPrimaryKey = async (root: any, args: any) => {
  console.log(root);
  const { id } = args;
  const data = {
    id: id,
  } as MemoModel;
  return await MemoBiz.INS.getMemoByPrimaryKey(knexConnection, data);
}

const addMemo = async (root: any, args: any) => {
  console.log(root);
  const { message } = args;
  const data = {
    message: message,
  } as MemoModel;
  const result = await knexConnection.transaction(async trx => {
    const memo = await MemoBiz.INS.addMemo(trx,data);
    memos.push(memo);
    return memo;
  });
  return result;
}