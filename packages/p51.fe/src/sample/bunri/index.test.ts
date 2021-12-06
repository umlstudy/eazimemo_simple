
// nodemon ./packages/p51.fe/src/index.test.ts
// cd packages/p51.fe/src/sample/bunri;nodemon index.test.ts

import { ApolloServer } from "apollo-server";
import { AppSchema } from "./AppSchema";

//1
const server = new ApolloServer({ schema:AppSchema });

//2
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
