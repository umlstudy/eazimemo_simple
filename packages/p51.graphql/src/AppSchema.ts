import { makeExecutableSchema } from '@graphql-tools/schema';
import { GenMemoResolver } from './graphql/GenMemoResolver';
import { GenTableTypeDefs } from './graphql/GenTableTypeDefs';

export const AppSchema = makeExecutableSchema({
    typeDefs: [GenTableTypeDefs],
    resolvers: [GenMemoResolver],
});