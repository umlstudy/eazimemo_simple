import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { PROJECT_HOME } from '@sejong/dao';
import * as fs from 'fs';

// 실행
// ts-node packages/p31.dao/src.generate/generateDao.ts

// https://github.com/rmp135/sql-ts

export const generateDao = async (projectHome: string, tables: string[]): Promise<void> => {

    const pkgLoc = `${projectHome}\\packages\\p31.dao`;
    const daoLoc = pkgLoc + "\\src\\dao";

    const absTmplLoc = pkgLoc + "\\src.generate\\generateAbsDao.tmpl";
    const absTmplString = fs.readFileSync(absTmplLoc, 'utf8');

    const tmplLoc = pkgLoc + "\\src.generate\\generateDao.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const exportClasses = [] as string[];

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
    
        const absConverted = SjTemplateUtil.convert(absTmplString, { modelName: pascalTableName});
        fs.writeFileSync(daoLoc + "//Abs" + pascalTableName + "Dao.ts", absConverted);
    
        const converted = SjTemplateUtil.convert(tmplString, { modelName: pascalTableName });
        fs.writeFileSync(daoLoc + "//" + pascalTableName + "Dao.ts", converted);

        const exportStr = `export { ${pascalTableName}Dao } from \"./dao/${pascalTableName}Dao\";`;
        exportClasses.push(exportStr);
    }

    exportClasses.forEach((s)=>console.log(s));
}

// 테이블 변경 혹은 추가시 함께 변경.
const tables = [] as string[];
tables.push("memo");
tables.push("user");

generateDao(PROJECT_HOME, tables);