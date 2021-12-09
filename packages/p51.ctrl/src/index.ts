
// nodemon 'packages/p51.ctrl/src/index.ts
// npx ts-node packages/p51.ctrl/src/index.ts


import { ApolloServer } from "apollo-server";
import { AppSchema } from "./AppSchema";

//1
const server = new ApolloServer({ schema: AppSchema });

//2
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});