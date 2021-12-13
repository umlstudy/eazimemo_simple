
import { gql } from "apollo-server-core";

// 자동생성된 코드 & 사용자에 의해 수정 필요
export const UserTypeDefs = gql`
    extend type User {
        dummy : Int
    }
`;

//     type Query {
//         user2 : User2!
//         user3 : User!
//     }

// const user2 = { id: 100 };
// const user3 = { id: 100, message:"hello", createAt:100, updateAt:100 };

// export const UserResolver = {
//     Query: {
//         user2: () => user2,
//         user3: () => user3,
//     }
// };