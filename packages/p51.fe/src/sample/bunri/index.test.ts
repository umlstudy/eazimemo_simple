// nodemon ./packages/p51.fe/src/sample/bunri/index.test.ts
// cd packages/p51.fe/src/sample/bunri;nodemon index.test.ts

import { ApolloServer } from "apollo-server";
import { AppSchema } from "./AppSchema";

//1
const server = new ApolloServer({ schema:AppSchema });

//2
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// query exam
// https://community.monday.com/t/curl-example-of-a-mutation-with-variables/1589

// curl - X POST - H "Content-Type:application/json" - H "Authorization:xxxxx" 'https://api.monday.com/v2' \
// -d '{"query" : "mutation($name:String!, $columns:JSON!){create_item(item_name:$name, board_id:162169280, column_values:$columns){name}}", "variables" : "{\"name\" : \"This is a var\", \"columns\" : \"{\\\"status\\\" : {\\\"index\\\" : 4}}\"}"}'

/*
mutation AddBook($title: String!, $author: String!) {
  addBook(title: $title, author: $author) {
    title
  }
}

variables {
  "title": "hello2",
    "author": "bbbb"
}
*/