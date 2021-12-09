
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
    addBook: (root: any, args: any) => addBook(root, args),
  }
};

const addBook = (root: any, args: any) => {
  console.log(root);
  const { title, author } = args;
  console.log(title + author);
  const data = {
    title: title,
    author: author
  };
  books.push(data);
  return data;
}
