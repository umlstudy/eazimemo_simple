import { makeExecutableSchema } from '@graphql-tools/schema';
import { GenMemoResolver } from './graphql/gen/GenMemoResolver';
import { GenTableTypeDefs } from './graphql/gen/GenTableTypeDefs';

export const AppSchema = makeExecutableSchema({
    typeDefs: [GenTableTypeDefs],
    resolvers: [GenMemoResolver],
});