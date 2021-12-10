
import { gql } from "apollo-server-core";

//1.
export const MemoTypeDefs = gql`
    type Memo2 {
        id : Int!
    }
    type Query {
        memo2 : Memo2!
        memo3 : Memo!
    }
`;

const memo2 = { id: 100 };
const memo3 = { id: 100, message:"hello", createAt:100, updateAt:100 };

//2.
export const MemoResolver = {
    Query: {
        memo2: () => memo2,
        memo3: () => memo3,
    }
};