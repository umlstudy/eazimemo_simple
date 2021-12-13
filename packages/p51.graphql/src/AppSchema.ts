import { makeExecutableSchema } from '@graphql-tools/schema';
import { DocumentNode } from 'graphql';
import { GenMemoResolver } from './graphql/gen/GenMemoResolver';
import { GenTableTypeDefs } from './graphql/gen/GenTableTypeDefs';
import { MemoTypeDefs } from './graphql/resolver/MemoResolver';
import { UserTypeDefs } from './graphql/resolver/UserResolver';

const typeDefs = [] as DocumentNode[];
typeDefs.push(GenTableTypeDefs);

// 추가 typeDefs 시작
typeDefs.push(MemoTypeDefs);
typeDefs.push(UserTypeDefs);
// 추가 typeDefs 종료

export const AppSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: [GenMemoResolver],
});