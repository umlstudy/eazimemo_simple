import { MemoBiz } from "./MemoBiz";
import { MemoModel, TranObjectOwner } from "@sejong/model";
import { AbsDao } from "@sejong/dao";

// npx ts-node packages/p41.biz/src/biz/MemoBizTester_insert.ts
async function main() {
  AbsDao.transaction(async (too:TranObjectOwner)=>{
    console.log("첫번째 레코드");
    const memo = { "message": "Hello", 'email': 'aaa@gmail.com' } as MemoModel;
    await MemoBiz.INS.insert(too, memo);
  })
    .catch(r => { 
      console.log("에러발생함" + r.toString());
      throw r;
    });
}

main();