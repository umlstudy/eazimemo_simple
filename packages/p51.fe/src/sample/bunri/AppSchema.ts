import { makeExecutableSchema } from '@graphql-tools/schema';
import { BookResolver, BookSchema } from "./BookResolver";
import { StudentResolver, StudentSchema } from "./StudentResolver";

export const AppSchema = makeExecutableSchema({
    typeDefs: [BookSchema, StudentSchema],
    resolvers: [BookResolver, StudentResolver],
});
