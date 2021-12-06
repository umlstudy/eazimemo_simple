
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
    addBook: (args:any) => addBook(args),
  }
};

const addBook = (args: any) => {
  const { title, author } = args;
  const data = {
    title,
    author
  };
  books.push(data);
  return data;
}
