import { MemoModel } from "@sejong/model";
import { MemoDao } from "./MemoDao";

// ts-node packages/p32.dao.firebase/src/dao/MemoDaoTester_whereByPrimaryKey.ts
const main = async () => {
  const memo = {} as MemoModel;
  memo.id='20';
  const memos = await MemoDao.INS.selectByPrimaryKey(memo!);
  console.log(memos);
}

main();