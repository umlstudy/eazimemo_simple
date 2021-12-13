
import { gql } from "apollo-server-core";

// 자동생성된 코드 & 사용자에 의해 수정 필요
export const MemoTypeDefs = gql`
    extend type Memo {
        dummy : Int
    }
`;

//     type Query {
//         memo2 : Memo2!
//         memo3 : Memo!
//     }

// const memo2 = { id: 100 };
// const memo3 = { id: 100, message:"hello", createAt:100, updateAt:100 };

// export const MemoResolver = {
//     Query: {
//         memo2: () => memo2,
//         memo3: () => memo3,
//     }
// };