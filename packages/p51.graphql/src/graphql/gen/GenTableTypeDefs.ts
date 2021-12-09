
import { gql } from "apollo-server-core";

export const GenTableTypeDefs = gql`
  #
  # Memo
  #
  type Memo {
    id: Int
    message : String
    createdAt: Int
    updatedAt: Int
  }
  input MemoInput {
    id: Int
    message : String
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
`;
