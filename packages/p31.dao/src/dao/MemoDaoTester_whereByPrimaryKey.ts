import { MemoModel } from "@sejong/model";
import { MemoDao } from "./MemoDao";

// ts-node packages/p31.dao/src/dao/MemoDaoTester_whereByPrimaryKey.ts
const main = async () => {
  const memo = {} as MemoModel;
  memo.memoId=1;
  const memos = await MemoDao.INS.selectByPrimaryKey(memo!);
  console.log(memos);
}

main();