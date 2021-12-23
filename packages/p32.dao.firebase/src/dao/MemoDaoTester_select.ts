import { MemoModel, UserModel } from "@sejong/model";
import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p31.dao/src/dao/MemoDaoTester_select.ts
async function main() {
  const memo = await MemoDao.INS.selectFirst(knexConnection);
  console.log("=> memo result #1");
  console.log(memo);

  const memoR = await MemoDao.INS.selectByPrimaryKey(knexConnection, memo!);
  console.log("=> memo result #2");
  console.log(memoR);

  type MemoUser = MemoModel & UserModel;
  const memoList = await MemoDao.INS.selectList(knexConnection, {} as MemoModel) as MemoUser[];

  for ( let i=0;i<memoList.length;i++ ) {
    console.log("memoList => " + memoList[i].name);
  }

  console.log(memoList.length + "건 검색 ");
}

main();