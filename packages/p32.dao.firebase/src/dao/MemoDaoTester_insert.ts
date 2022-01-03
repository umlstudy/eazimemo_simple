import { MemoModel } from "@sejong/model";
import { AbsDao } from "..";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p32.dao.firebase/src/dao/MemoDaoTester_insert.ts
async function main() {
  const memo = { "message": "테스트!!!" } as MemoModel;

  const memoDao = MemoDao.INS;
  try {
    const batch = AbsDao.createWriteBatch();
    await (await memoDao.insert(batch, memo)).commit();
    console.log("삽입결과");
    console.log(memo);
    const selMemo = await memoDao.selectByPrimaryKey(memo).catch(e=>{
      console.log("eeeeeeeee");
      console.log(e)}
      );
    console.log("입력 결과");
    console.log(selMemo);
  } catch ( e ) {
    console.log(e);
  }
}

main();