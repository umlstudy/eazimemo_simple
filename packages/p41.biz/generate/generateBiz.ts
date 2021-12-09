import { SjChangeCaseUtil, SjTemplateUtil } from '@sejong/common';
import * as fs from 'fs';

// 실행
// ts-node packages/p41.biz/generate/generateBiz.ts

async function main() {
    const srcLoc = "D:\\gitrepos\\eazimemo_simple\\packages\\p41.biz\\src";
    const bizLoc = srcLoc + "\\biz";

    const absTmplLoc = srcLoc + "\\generate\\generateAbsBiz.tmpl";
    const absTmplString = fs.readFileSync(absTmplLoc, 'utf8');

    const tmplLoc = srcLoc + "\\generate\\generateBiz.tmpl";
    const tmplString = fs.readFileSync(tmplLoc, 'utf8');

    const exportClasses = [] as string[];
    {
        const table = "memo";
        const pascalTableName = SjChangeCaseUtil.convertCase(table, 'pascal');
        const camelTableName = SjChangeCaseUtil.convertCase(table, 'camel');

        const data = {
            pascalModelName: pascalTableName
            , camelModelName: camelTableName
        };
        const absConverted = SjTemplateUtil.convert(absTmplString, data);
        fs.writeFileSync(bizLoc + "//Abs" + pascalTableName + "Biz.ts", absConverted);
    
        const converted = SjTemplateUtil.convert(tmplString, data);
        fs.writeFileSync(bizLoc + "//" + pascalTableName + "Biz.ts", converted);

        const exportStr = `export { ${pascalTableName}Biz } from \"./biz/${pascalTableName}Biz\";`;
        exportClasses.push(exportStr);
    }

    exportClasses.forEach((s)=>console.log(s));
}

main();