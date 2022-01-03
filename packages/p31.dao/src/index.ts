// npm run build.dao
// cd packages/p31.dao
// tsc 
// cd ../..
//
// yarn install

export { AbsDao } from "./dao/AbsDao";
export { AbsIdBaseDao } from "./dao/AbsIdBaseDao";
export { SjKnexSchemaUtil } from "./util/knex/SjKnexSchemaUtil";

// 테이블이 추가되면 계속 추가됨
export { MemoDao } from "./dao/MemoDao";
export { UserDao } from "./dao/UserDao";

export const PROJECT_HOME = "D:\\gitrepos\\eazimemo_simple";

// 빌드
// cd packages/p31.dao;rm -rf dist;tsc;yarn install;cd ../..

