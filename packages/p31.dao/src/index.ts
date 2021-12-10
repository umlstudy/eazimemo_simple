// npm run build.dao
// cd packages/p31.dao
// tsc 
// cd ../..
//
// yarn install

export { AbsDao } from "./dao/AbsDao";
export { AbsIdBaseDao } from "./dao/AbsIdBaseDao";
export { knexConnection } from "./KnexConfig";
export { MemoDao } from "./dao/MemoDao";
export { SjKnexSchemaUtil } from "./util/knex/SjKnexSchemaUtil";

export const PROJECT_HOME = "D:\\gitrepos\\eazimemo_simple";


