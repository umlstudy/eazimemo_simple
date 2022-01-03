import { MemoModel, TranObjectOwner } from "@sejong/model";
import { AbsDao } from "./AbsDao";
import { MemoDao } from "./MemoDao";

// npx ts-node packages/p31.dao/src/dao/MemoDaoTester_insert.ts
async function main() {
  const memo = {"message":"Hello", email:"aaa@k.com"} as MemoModel;
   
  await AbsDao.transaction(async (too:TranObjectOwner)=>{
    console.log("1. inert " + memo);
    await MemoDao.INS.insert(too, memo);
    console.log("1. success");
    console.log("2. inert " + memo);
    await MemoDao.INS.insert(too, memo);
    console.log("2. success");
  })
  .catch(r=>console.log("에러발생함" + r.toString()));
}

main();