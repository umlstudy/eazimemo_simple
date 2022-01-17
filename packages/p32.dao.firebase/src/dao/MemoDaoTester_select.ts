import { MemoModel } from "@sejong/model";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p32.dao.firebase/src/dao/MemoDaoTester_select.ts
async function main() {
  const memo = await MemoDao.INS.selectFirst({} as MemoModel);
  console.log("=> memo result #1");
  console.log(memo);

  const memoR = await MemoDao.INS.selectByPrimaryKey(memo!);
  console.log("=> memo result #2");
  console.log(memoR);

  const memoList = await MemoDao.INS.selectList(memoR!);

  for ( let i=0;i<memoList.models.length;i++ ) {
    console.log("memoList => " + memoList.models[i].id + ":" + memoList.models[i].message);
  }

  console.log(memoList.models.length + "건 검색 ");
}

main();