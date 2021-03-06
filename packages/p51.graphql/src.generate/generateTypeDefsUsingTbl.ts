import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { PROJECT_HOME, SjKnexSchemaUtil } from '@sejong/dao';
import { knexConnection } from '../../p31.dao/src/KnexConfig';
import { ColumnInfo } from '@sejong/model';
import * as fs from 'fs';

// 실행
// ts-node packages/p51.graphql/src.generate/generateTypeDefsUsingTbl.ts

export const generateTypeDefsUsingTbl = async (projectHome: string, tables: string[]): Promise<void> => {
    const srcLoc = `${projectHome}\\packages\\p51.graphql`;
    const targetLoc = srcLoc + "\\src\\graphql\\gen";

    const tmplLoc = srcLoc + "\\src.generate\\generateTypeDefsUsingTbl.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const database = knexConnection;
    const data = {} as any;
    const tablesInData = [] as any[];
    data['tables'] = tablesInData;

    const exportClasses = [] as string[];

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        const columnsTmp = await SjKnexSchemaUtil.extractColumns4Gql(database, table);
        const columns = [] as ColumnInfo[];
        for (const key in columnsTmp) {
            const typeStr = columnsTmp[key];
            const camelColumnName = SjChangeCaseUtil.convertCase(key, 'camel');
            const col = {
                columnName: camelColumnName,
                columnType: camelColumnName === 'id' ? 'String' : typeStr
            } as ColumnInfo;
            columns.push(col);
        }

        const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
        const camelTableName = SjChangeCaseUtil.convertCase(table, 'camel');
        tablesInData.push({
            pascalTableName: pascalTableName,
            camelTableName: camelTableName,
            columns: columns
        });

        const exportStr = `export { ${pascalTableName}Biz } from \"./biz/${pascalTableName}Biz\";`;
        exportClasses.push(exportStr);
    }

    const converted = SjTemplateUtil.convert(tmplString, data);
    fs.writeFileSync(targetLoc + "//GenTableTypeDefs.ts", converted);

    exportClasses.forEach((s) => console.log(s));
}

// 테이블 변경 혹은 추가시 함께 변경.
const tables = [] as string[];
tables.push("memo");
tables.push("user");

generateTypeDefsUsingTbl(PROJECT_HOME, tables);