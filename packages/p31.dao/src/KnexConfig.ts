import knex from 'knex';
import { knexSetting } from "./KnexSetting";

export const knexConnection = knex(knexSetting.development);
