import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import { PROJECT_HOME } from '@sejong/dao';

import * as fs from 'fs';
// import knex from 'knex';
// import SchemaInspector from 'knex-schema-inspector';
// import { knexDefaultSetting } from '../KnexSetting';

// 실행
// ts-node packages/p31.dao/src.generate/generateDao.ts

// https://github.com/rmp135/sql-ts

async function main() {
    const srcLoc = `${PROJECT_HOME}\\packages\\p31.dao\\src`;
    const daoLoc = srcLoc + "\\dao";

    // const database = knex(knexDefaultSetting);
    // const inspector = SchemaInspector(database);
    // const tables = await inspector.tables();

    // tables.forEach(async(table)=>{
    //     const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
    //     const converted = SjTemplateUtil.convert(tmplString, { modelName: pascalTableName});
    //     fs.writeFileSync(daoLoc+"//Abs" + pascalTableName + "Dao.ts", converted);
    // });

    const absTmplLoc = srcLoc + "\\generate\\generateAbsDao.tmpl";
    const absTmplString = fs.readFileSync(absTmplLoc, 'utf8');

    const tmplLoc = srcLoc + "\\generate\\generateDao.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const exportClasses = [] as string[];
    {
        const table = "memo";
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

main();