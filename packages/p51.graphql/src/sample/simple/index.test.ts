
// nodemon ./packages/p51.graphql/src/sample/simple/index.test.ts

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
  type Mutation 
  {
    addBook(title: String!, author: String!): Book!
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
  Mutation: {
    addBook: (root:any, args:any) => addBook(root, args),
  }
};

const addBook = (root: any, args: any) => {
  console.log(root);
  const { title, author } = args;
  const data = {
    title,
    author
  };
  books.push(data);
  return data;
}

//4.
const server = new ApolloServer({ typeDefs, resolvers });

//5.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
