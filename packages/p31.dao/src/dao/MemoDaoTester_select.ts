import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p31.dao/src/dao/MemoDaoTester_select.ts
async function main() {
  const memo = await MemoDao.INS.selectFirst(knexConnection);
  const memoR = await MemoDao.INS.selectByPrimaryKey(knexConnection, memo!);
  console.log(memoR);
}

main();