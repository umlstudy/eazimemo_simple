import { MemoModel } from "@sejong/model";
import { MemoDao } from "./MemoDao";

// ts-node packages/p32.dao.firebase/src/dao/MemoDaoTester_selectWithConditions.ts
async function main() {
  const memo = {} as MemoModel;
  memo.createdAtFromToInfo = {
    from: "2021-01-01",
    to: "2022-12-01"
  };
  memo.pageInfo= {
    curPagePos: 0,
    rowsPerPage: 5,
    totalPageCnt: 0
  };
  const memos = await MemoDao.INS.select(memo!, false);
  console.log(memos);
}

main();