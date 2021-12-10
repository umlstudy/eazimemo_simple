import { MemoModel } from "@sejong/model";
import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// ts-node packages/p31.dao/src/dao/MemoDaoTester_selectByDefaultFilter.ts
async function main() {
  const memo = {} as MemoModel;
  memo.filterInfo={
    fromToInfo:{
      from: "2021-01-01",
      to: "2022-12-01"
    },
    pageInfo:{
      curPagePos:0,
      rowsPerPage:5,
      totalPageCnt:0
    }
  };
  const memos = await MemoDao.INS.selectByDefaultFilter(knexConnection, memo!);
  console.log(memos);
}

main();