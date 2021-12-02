import sqlts from '@rmp135/sql-ts'
import { LogUtil } from '@sejong/common';
import { knexDefaultSetting } from '../src/KnexSetting';

// 실행
// npx ts-node packages/p31.dao/generate/generateInterface.ts

// https://github.com/rmp135/sql-ts

async function main() {
    console.log("----------------");
    const setting = knexDefaultSetting;
    console.log("----------------");
    const definitions = await sqlts.toObject(setting)
    console.log("----------------");
    const tsString = sqlts.fromObject(definitions, setting)

    console.log("----------------");
    LogUtil.debug(tsString);
    console.log("================");
}

main();