import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { PROJECT_HOME } from '@sejong/dao';
import * as fs from 'fs';

// 실행
// ts-node packages/p51.graphql/src.generate/generateUserModelResolverUsingTbl.ts

async function main() {
    const srcLoc = `${PROJECT_HOME}\\packages\\p51.graphql`;
    const targetLoc = srcLoc + "\\src\\graphql\\resolver";

    const tmplLoc = srcLoc + "\\src.generate\\generateUserModelResolverUsingTbl.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const exportClasses = [] as string[];
    // 테이블 변경 혹은 추가시 함께 변경.
    const tables = [] as string[];
    tables.push("memo");
    tables.push("user");

    for (let i = 0; i < tables.length; i++) {

        const table = tables[i];
        const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
        const camelTableName = SjChangeCaseUtil.convertCase(table, 'camel');

        const data = {
            pascalModelName: pascalTableName
            , camelModelName: camelTableName
        };

        const converted = SjTemplateUtil.convert(tmplString, data);
        fs.writeFileSync(targetLoc + "//" + pascalTableName + "Resolver.ts", converted);

        const exportStr = `export { ${pascalTableName}Biz } from \"./biz/${pascalTableName}Biz\";`;
        exportClasses.push(exportStr);
    }

    exportClasses.forEach((s) => console.log(s));
}

main();