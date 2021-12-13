import { PROJECT_HOME } from '@sejong/dao';
import { generateResolverUsingTbl } from '../src.generate/generateResolverUsingTbl';
import { generateTypeDefsUsingTbl } from '../src.generate/generateTypeDefsUsingTbl';
import { generateUserModelResolverUsingTbl } from '../src.generate/generateUserModelResolverUsingTbl';
import { generateBiz } from '../../p41.biz/src.generate/generateBiz';
import { generateModelInterface } from '@sejong/dao/src.generate/generateModelInterface';
import { generateDao } from '@sejong/dao/src.generate/generateDao';

// 실행
// ts-node packages/p51.graphql/src.generate.all/generateAll.ts

// 테이블 변경 혹은 추가시 함께 변경.

const main=async ()=> {
    const tables = [] as string[];
    tables.push("memo");
    tables.push("user");
    
    generateModelInterface(PROJECT_HOME, tables);
    generateDao(PROJECT_HOME, tables);
    
    generateBiz(PROJECT_HOME, tables);
    
    generateResolverUsingTbl(PROJECT_HOME, tables);
    generateTypeDefsUsingTbl(PROJECT_HOME, tables);
    generateUserModelResolverUsingTbl(PROJECT_HOME, tables);
    
    console.log('cd packages/p21.model/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p31.dao/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p41.biz/;rm -rf dist;tsc;yarn install;cd ../..');
    console.log('cd packages/p51.graphql/;rm -rf dist;tsc;yarn install;cd ../..');
};

main();
