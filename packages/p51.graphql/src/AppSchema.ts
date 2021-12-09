import { makeExecutableSchema } from '@graphql-tools/schema';
import { GenMemoResolver } from './graphql/gen/GenMemoResolver';
import { GenTableTypeDefs } from './graphql/gen/GenTableTypeDefs';
import { MemoResolver, MemoTypeDefs } from './graphql/resolver/MemoResolver';

export const AppSchema = makeExecutableSchema({
    typeDefs: [GenTableTypeDefs, MemoTypeDefs],
    resolvers: [GenMemoResolver, MemoResolver],
});