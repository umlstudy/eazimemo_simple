import { request } from "graphql-request";

// 서버실행 후 실행
// npx ts-node packages/p51.graphql/src/index.ts
//
// ts-node packages/p51.graphql/src.test/GraphqlSelectListTester.ts

console.log("start...");
const endpoint = "http://localhost:5000/graphql";
const query = `{
  getMemoList(memo: {}) {
    message
  }
}`;

console.log("request...");
request(endpoint, query).then((data:any) =>
    console.log(JSON.stringify(data, null, 2))
)/* .catch(e=>console.log(e.toString())) */;