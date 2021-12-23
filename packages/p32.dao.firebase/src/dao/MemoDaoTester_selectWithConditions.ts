import { MemoModel } from "@sejong/model";
import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// ts-node packages/p31.dao/src/dao/MemoDaoTester_selectWithConditions.ts
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
  const memos = await MemoDao.INS.select(knexConnection, memo!);
  console.log(memos);
}

main();