import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { PROJECT_HOME, SjKnexSchemaUtil } from '@sejong/dao';
import { knexConnection } from '../src/KnexConfig';
import { ColumnInfo } from '@sejong/model';
import * as fs from 'fs';

// 실행
// ts-node packages/p31.dao/src.generate/generateModelInterface.ts

export const generateModelInterface = async (projectHome: string, tables: string[]): Promise<void> => {

    const srcLoc = `${projectHome}\\packages\\p31.dao`;
    const targetLoc = srcLoc + "\\..\\p21.model\\src";

    const tmplLoc = srcLoc + "\\src.generate\\generateModelInterface.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const database = knexConnection;
    const data = {} as any;
    const tablesInData = [] as any[];
    data['tables'] = tablesInData;

    const exportClasses = [] as string[];

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        const columnsTmp = await SjKnexSchemaUtil.extractColumns(database, table);
        const columns = [] as ColumnInfo[];
        for (const key in columnsTmp) {
            const typeStr = columnsTmp[key];
            const camelColumnName = SjChangeCaseUtil.convertCase(key, 'camel');
            if (camelColumnName === 'createdAt' 
                || camelColumnName === 'updatedAt'
                || camelColumnName === 'creatorEmail'
                || camelColumnName === 'updaterEmail'
             ) {
                 continue;
            }
            const col = {
                columnName: camelColumnName,
                columnType: typeStr
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

        const exportStr = `${pascalTableName}Model`;
        exportClasses.push(exportStr);
    }

    const converted = SjTemplateUtil.convert(tmplString, data);
    fs.writeFileSync(targetLoc + "//GenModels.ts", converted);

    console.log('code packages/p21.model/src/index.ts');
    console.log(exportClasses.join(', '));
    console.log('cd packages/p21.model/;rm -rf dist;tsc;yarn install;cd ../..');
}

// 테이블 변경 혹은 추가시 함께 변경.
const tables = [] as string[];
tables.push("memo");
tables.push("user");

generateModelInterface(PROJECT_HOME, tables);