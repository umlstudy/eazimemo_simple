
// 실행
// npx ts-node packages/p51.graphql/src/generate/generateSchemaAndResolverUsingTbl.ts

import { SjLogUtil } from "@sejong/common";
import { knexDefaultSetting } from "@sejong/dao";

// https://github.com/rmp135/sql-ts

async function main() {
    console.log("----------------");
    const dbSetting = { ...knexDefaultSetting
        , "interfaceNameFormat": "${table}Model"
        , "columnNameCasing": "camel"
        , "tableNameCasing": "pascal"
    };
    console.log("----------------");
    const definitions = await sqlts.toObject(dbSetting)
    console.log("----------------");
    const tsString = sqlts.fromObject(definitions, dbSetting)

    console.log("----------------");
    SjLogUtil.debug(tsString);
    console.log("================");
}

main();