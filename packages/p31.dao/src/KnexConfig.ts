import knex from 'knex';
import { knexDefaultSetting } from "./KnexSetting";

export const knexConnection = knex(knexDefaultSetting);
