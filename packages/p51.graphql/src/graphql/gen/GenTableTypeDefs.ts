
import { gql } from "apollo-server-core";

export const GenTableTypeDefs = gql`
  #
  # Memo
  #
  type Memo {
    id: String
    message: String
    creatorEmail: String
    updaterEmail: String
    createdAt: Int
    updatedAt: Int
  }
  input MemoInput {
    id: String
    message: String
    creatorEmail: String
    updaterEmail: String
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
    id: String
    email: String
    name: String
    createdAt: Int
    updatedAt: Int
  }
  input UserInput {
    id: String
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
