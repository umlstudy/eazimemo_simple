import { MemoBiz } from "./MemoBiz";

// npx ts-node packages/p41.biz/src/biz/MemoBizTester_select.ts
async function main() {
  const memo = await MemoBiz.INS.selectFirst();
  const memoR = await MemoBiz.INS.selectById(memo!);
  console.log(memoR);
}

main();