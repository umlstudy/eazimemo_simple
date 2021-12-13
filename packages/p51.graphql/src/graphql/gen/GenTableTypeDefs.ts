
import { gql } from "apollo-server-core";

export const GenTableTypeDefs = gql`
  #
  # Memo
  #
  type Memo {
    memoId: Int
    message: String
    email: String
    createdAt: Int
    updatedAt: Int
  }
  input MemoInput {
    memoId: Int
    message: String
    email: String
    createdAt: Int
    updatedAt: Int
  }
  type Query
  {
    getMemoByPrimaryKey(memo: MemoInput!): Memo
  }
  type Mutation {
    addMemo(memo: MemoInput!): Memo!
    removeMemo(memo: MemoInput!): Memo!
    updateMemo(memo: MemoInput!): Memo!
  }
  #
  # User
  #
  type User {
    userId: Int
    email: String
    name: String
    createdAt: Int
    updatedAt: Int
  }
  input UserInput {
    userId: Int
    email: String
    name: String
    createdAt: Int
    updatedAt: Int
  }
  type Query
  {
    getUserByPrimaryKey(user: UserInput!): User
  }
  type Mutation {
    addUser(user: UserInput!): User!
    removeUser(user: UserInput!): User!
    updateUser(user: UserInput!): User!
  }
`;
