
import { gql } from "apollo-server-core";

//1.
export const BookSchema = gql`
  type Book {
    title: String
    author: String
  }
  type Query
  {
    books: [Book]
  }
  type Mutation {
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
export const BookResolver = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (title:string, author:string) => addBook(title, author),
  }
};

const addBook = (title: string, author: string) => {
  // const { title, author } = args;
  const data = {
    title,
    author
  };
  books.push(data);
  return data;
}
