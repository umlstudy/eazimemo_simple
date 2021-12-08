import { MemoBiz } from "./MemoBiz";
import { MemoModel } from "@sejong/model";
import { knexConnection } from "@sejong/dao";

// npx ts-node packages/p41.biz/src/biz/MemoBizTester_insert.ts
async function main() {
  const memo = { "message": "Hello" } as MemoModel;
  knexConnection.transaction(async trx => {
    console.log("000000000");
    await MemoBiz.INS.insert(trx, memo);
    console.log("111111111");
    await MemoBiz.INS.insert(trx, memo)
    console.log("222222222");
    await MemoBiz.INS.insert(trx, memo)
    console.log("333333333");
    await MemoBiz.INS.insert(trx, memo)
  })
    .catch(r => console.log("에러발생함" + r.toString()));
}

main();