import { makeExecutableSchema } from '@graphql-tools/schema';
import { BookResolver, BookSchema } from "./BookResolver";
import { StudentResolver, StudentSchema } from "./StudentResolver";

// export const AppSchema = makeExecutableSchema({
//     typeDefs: [BookSchema],
//     resolvers: [BookResolver],
// });

export const AppSchema = makeExecutableSchema({
    typeDefs: [StudentSchema, BookSchema],
    resolvers: [StudentResolver, BookResolver],
});