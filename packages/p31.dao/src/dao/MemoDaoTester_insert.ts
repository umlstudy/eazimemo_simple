import { knexConnection } from "../KnexConfig";
import { MemoDao } from "./MemoDao";
import { MemoModel } from "@sejong/model";

async function main() {
    const memo = {"message":"Hello"} as MemoModel;
    knexConnection.transaction(trx => {
        MemoDao.INS.insert(trx, memo)
        MemoDao.INS.insert(trx, memo)
        MemoDao.INS.insert(trx, memo)
        MemoDao.INS.insert(trx, memo)
    })
}

main();