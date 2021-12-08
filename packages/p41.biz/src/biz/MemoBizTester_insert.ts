import { knexConnection } from "../KnexConfig";
import { MemoBiz } from "./MemoBiz";
import { MemoModel } from "@sejong/model";

// npx ts-node packages/p31.dao/src/dao/MemoDaoTester_insert.ts
async function main() {
  const memo = { "message": "Hello" } as MemoModel;
  knexConnection.transaction(async trx => {
    console.log("000000000");
    await MemoBiz.INS.insert(trx, memo);
    console.log("111111111");
    //  .catch(r => console.log("에러발생함#1" + r.toString()));
    await MemoBiz.INS.insert(trx, memo)
    console.log("222222222");
    await MemoBiz.INS.insert(trx, memo)
    console.log("333333333");
    await MemoBiz.INS.insert(trx, memo)
  })
    .catch(r => console.log("에러발생함" + r.toString()));
}

main();