
import { gql } from "apollo-server-core";

//1.
export const StudentSchema = gql`
  type Student {
    name: String
    school: String
  }
  extend type Query 
  {
    students: [Student]
  }
  extend type Mutation {
    addStudent: (name:String!, school:String!) : Student!
  }
`;

//2.
const students = [
  {
    name: 'The Awakening',
    school: 'Kate Chopin',
  },
  {
    name: 'City of Glass',
    school: 'Paul Auster',
  },
];

//3.
export const StudentResolver = {
  Query: {
    students: () => students,
  },
  Mutation: {
    addStudent: (args:any) => addStudent(args),
  }
};

const addStudent = (args: any) => {
  const { name, school } = args;
  const data = {
    name,
    school
  };
  students.push(data);
  return data;
};
