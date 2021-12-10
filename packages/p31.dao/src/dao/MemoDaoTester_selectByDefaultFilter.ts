import { MemoModel } from "@sejong/model";
import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";

// ts-node packages/p31.dao/src/dao/MemoDaoTester_selectByDefaultFilter.ts
async function main() {
  const memo = {} as MemoModel;
  memo.filterInfo={
    fromToInfo:{
      from:new Date(),
      to: new Date()
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