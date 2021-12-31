import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { PROJECT_HOME } from '@sejong/dao';
import * as fs from 'fs';

// 실행
// ts-node packages/p32.dao.firebase/src.generate/generateSequenceGenerator.ts

export const generateModelInterface = async (projectHome: string, tables: string[]): Promise<void> => {

    const srcLoc = `${projectHome}\\packages\\p32.dao.firebase`;
    const targetLoc = srcLoc + "\\src\\dao";
    const targetFile = targetLoc + "//SequenceGeneratorTester.ts";

    const tmplLoc = srcLoc + "\\src.generate\\generateSequenceGenerator.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const data = {} as any;
    const tablesInData = [] as any[];
    data['tables'] = tablesInData;

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
        const camelTableName = SjChangeCaseUtil.convertCase(table, 'camel');
        tablesInData.push({
            pascalTableName: pascalTableName,
            camelTableName: camelTableName
        });
    }

    const converted = SjTemplateUtil.convert(tmplString, data);
    fs.writeFileSync(targetFile, converted);

    console.log('code ' + targetFile);
    console.log('cd packages/p32.dao.firebase/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p32.dao.firebase/;rm -rf dist;tsc;cd ../..');
}

// 테이블 변경 혹은 추가시 함께 변경.
const tables = [] as string[];
tables.push("memo");
tables.push("user");

generateModelInterface(PROJECT_HOME, tables);