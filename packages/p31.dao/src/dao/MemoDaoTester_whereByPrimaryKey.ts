import { MemoModel } from "@sejong/model";
import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// ts-node packages/p31.dao/src/dao/MemoDaoTester_whereByPrimaryKey.ts
const main = async () => {
  const memo = {} as MemoModel;
  memo.memoId=1;
  const memos = await MemoDao.INS.selectById(knexConnection, memo!);
  console.log(memos);
}

main();