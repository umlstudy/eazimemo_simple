
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
  type MemoList {
    models:[Memo]
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
    getMemoList(memo: MemoInput!): MemoList
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
  type UserList {
    models:[User]
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
    getUserList(user: UserInput!): UserList
  }
  type Mutation {
    addUser(user: UserInput!): User!
    removeUser(user: UserInput!): User!
    updateUser(user: UserInput!): User!
  }
`;
