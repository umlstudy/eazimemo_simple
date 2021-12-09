
import { gql } from "apollo-server-core";

export const TableTypeDefs = gql`
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
