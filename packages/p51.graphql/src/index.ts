// nodemon packages/p51.graphql/src/index.ts
// npx ts-node packages/p51.graphql/src/index.ts

// compile
// cd packages/p51.graphql;rm -rf dist;tsc;cd ../..

import { ApolloServer } from "apollo-server";
import { AppSchema } from "./AppSchema";

//1
const server = new ApolloServer({ schema: AppSchema });

//2
const PORT = 5000;
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});