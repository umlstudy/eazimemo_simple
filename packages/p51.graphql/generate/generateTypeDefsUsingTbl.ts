
// 실행
// * 1회 실행
// ts-node packages/p51.graphql/generate/generateTypeDefsUsingTbl.ts
// * 모니터
// nodemon packages/p51.graphql/generate/generateTypeDefsUsingTbl.ts

import { SjLogUtil } from "@sejong/common";

async function main() {
    SjLogUtil.debug("HELLLO DEBUG");
    SjLogUtil.debug("HELLLO DEBUG22");
    // console.log("----------------");
    // const dbSetting = { ...knexDefaultSetting
    //     , "interfaceNameFormat": "${table}Model"
    //     , "columnNameCasing": "camel"
    //     , "tableNameCasing": "pascal"
    // };
    // console.log("----------------");
    // const definitions = await sqlts.toObject(dbSetting)
    // console.log("----------------");
    // const tsString = sqlts.fromObject(definitions, dbSetting)

    // console.log("----------------");
    // SjLogUtil.debug(tsString);
    // console.log("================");
}

main();