
import { gql } from "apollo-server-core";

//1.
export const StudentSchema = gql`
  type Student {
    name: String
    school: String
  }
  type Query 
  {
    students: [Student]
  }
  type Mutation {
    addStudent(name:String!, school:String!) : Student!
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
    addStudent: (root:any, args:any) => addStudent(root, args),
  }
};

const addStudent = (root: any, args: any) => {
  console.log(root);
  const { name, school } = args;
  const data = {
    name:name,
    school:school
  };
  students.push(data);
  return data;
};
