
// nodemon ./packages/p51.fe/src/index.test.ts
// cd packages/p51.fe/src/;nodemon index.test.ts

import { ApolloServer } from "apollo-server";
import { gql } from "apollo-server-core";

//1.
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query 
  {
    books: [Book]
  }
`;

//2.
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

//3.
const resolvers = {
    Query: {
        books: () => books,
    },
};

//4.
const server = new ApolloServer({ typeDefs, resolvers });

//5.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
