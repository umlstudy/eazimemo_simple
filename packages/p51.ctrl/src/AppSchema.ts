import { makeExecutableSchema } from '@graphql-tools/schema';
import { MemoResolver, MemoSchema } from './ctrl/resolvers/MemoResolver';

export const AppSchema = makeExecutableSchema({
    typeDefs: [MemoSchema],
    resolvers: [MemoResolver],
});