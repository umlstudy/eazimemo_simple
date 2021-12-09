import { makeExecutableSchema } from '@graphql-tools/schema';
import { MemoResolver, MemoSchema } from './graphql/MemoResolver';

export const AppSchema = makeExecutableSchema({
    typeDefs: [MemoSchema],
    resolvers: [MemoResolver],
});