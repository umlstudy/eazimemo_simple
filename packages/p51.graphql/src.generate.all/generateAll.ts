import { generateResolverUsingTbl } from '../src.generate/generateResolverUsingTbl';
import { generateTypeDefsUsingTbl } from '../src.generate/generateTypeDefsUsingTbl';
import { generateUserModelResolverUsingTbl } from '../src.generate/generateUserModelResolverUsingTbl';
import { generateBiz } from '../../p41.biz/src.generate/generateBiz';
import { generateModelInterface } from '@sejong/dao/src.generate/generateModelInterface';
import { generateDao } from '@sejong/dao/src.generate/generateDao';
import { PROJECT_HOME } from '@sejong/dao/src/index'

// 실행
// ts-node packages/p51.graphql/src.generate.all/generateAll.ts

// 테이블 변경 혹은 추가시 함께 변경.

const main=async ()=> {
    const tables = [] as string[];
    tables.push("memo");
    tables.push("user");
    
    await generateModelInterface(PROJECT_HOME, tables);
    await generateDao(PROJECT_HOME, tables);
    
    await generateBiz(PROJECT_HOME, tables);
    
    await generateResolverUsingTbl(PROJECT_HOME, tables);
    await generateTypeDefsUsingTbl(PROJECT_HOME, tables);
    await generateUserModelResolverUsingTbl(PROJECT_HOME, tables);
    
    console.log('cd packages/p21.model/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p31.dao/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p41.biz/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p51.graphql/;rm -rf dist;tsc;yarn install;cd ../..');
};

main();
