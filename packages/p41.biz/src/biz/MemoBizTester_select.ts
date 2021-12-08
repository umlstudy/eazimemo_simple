import { knexConnection } from "@sejong/dao";
import { MemoBiz } from "./MemoBiz";

// npx ts-node packages/p41.biz/src/biz/MemoBizTester_select.ts
async function main() {
  const memo = await MemoBiz.INS.selectFirst(knexConnection);
  const memoR = await MemoBiz.INS.selectById(knexConnection, memo!);
  console.log(memoR);
}

main();