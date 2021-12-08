
// 실행
// npx ts-node packages/p51.fe/src/generate/generateSchemaAndResolver.ts

import sqlts from '@rmp135/sql-ts'
import { SjLogUtil } from "@sejong/common";
import { knexDefaultSetting } from "@sejong/dao";

// https://github.com/rmp135/sql-ts

async function main() {
    console.log("----------------");
    const setting = { ...knexDefaultSetting
        , "interfaceNameFormat": "${table}Model"
        , "columnNameCasing": "camel"
        , "tableNameCasing": "pascal"
    };
    console.log("----------------");
    const definitions = await sqlts.toObject(setting)
    console.log("----------------");
    const tsString = sqlts.fromObject(definitions, setting)

    console.log("----------------");
    SjLogUtil.debug(tsString);
    console.log("================");
}

main();