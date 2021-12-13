import { MemoModel } from "@sejong/model";
import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p31.dao/src/dao/MemoDaoTester_select.ts
async function main() {
  const memo = await MemoDao.INS.selectFirst(knexConnection);
  const memoR = await MemoDao.INS.selectByPrimaryKey(knexConnection, memo!);
  console.log(memoR);

  const memoList = await MemoDao.INS.selectList(knexConnection, {} as MemoModel);
  console.log(memoList.length + "건 검색");
}

main();