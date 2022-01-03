import { MemoModel, TranObjectOwner } from "@sejong/model";
import { AbsDao } from "..";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p32.dao.firebase/src/dao/MemoDaoTester_insert.ts
async function main() {
  const memo = { "message": "테스트!!!" } as MemoModel;

  const memoDao = MemoDao.INS;
  try {
    const func = async (too:TranObjectOwner) => {
      await memoDao.insert(too, memo);
      console.log("삽입결과");
      console.log(memo);
    }
    await AbsDao.transaction(func);
    const selMemo = await memoDao.selectByPrimaryKey(memo);
    console.log("입력 결과");
    console.log(selMemo);

  } catch ( e ) {
    console.log(e);
  }
}

main();