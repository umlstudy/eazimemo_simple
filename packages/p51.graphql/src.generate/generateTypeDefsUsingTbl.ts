import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { knexConnection, PROJECT_HOME, SjKnexSchemaUtil } from '@sejong/dao';
import { ColumnInfo } from '@sejong/model';
import * as fs from 'fs';

// 실행
// ts-node packages/p51.graphql/src.generate/generateTypeDefsUsingTbl.ts

async function main() {
    const srcLoc = `${PROJECT_HOME}\\packages\\p51.graphql`;
    const targetLoc = srcLoc + "\\src\\graphql\\gen";

    const tmplLoc = srcLoc + "\\src.generate\\generateTypeDefsUsingTbl.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const exportClasses = [] as string[];
    const database = knexConnection;
    {
        const data = {} as any;
        const tables = [] as any[];
        data['tables'] = tables;

        const table = "memo";

        const columnsTmp = await SjKnexSchemaUtil.extractColumns4Gql(database, table);
        const columns = [] as ColumnInfo[];
        for (const key in columnsTmp) {
            const typeStr = columnsTmp[key]; 
            const camelColumnName = SjChangeCaseUtil.convertCase(key, 'camel');
            const col = {
                columnName: camelColumnName,
                columnType: typeStr
            } as ColumnInfo;
            columns.push(col);
        }

        const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
        const camelTableName = SjChangeCaseUtil.convertCase(table, 'camel');
        tables.push({
            pascalTableName: pascalTableName,
            camelTableName: camelTableName,
            columns: columns
        });

        const converted = SjTemplateUtil.convert(tmplString, data);
        fs.writeFileSync(targetLoc + "//GenTableTypeDefs.ts", converted);

        const exportStr = `export { ${pascalTableName}Biz } from \"./biz/${pascalTableName}Biz\";`;
        exportClasses.push(exportStr);
    }

    exportClasses.forEach((s) => console.log(s));
}

main();