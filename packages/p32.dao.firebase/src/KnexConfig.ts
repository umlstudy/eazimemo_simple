import knex from 'knex';
import { knexDefaultSetting } from "./FirebaseSetting";

export const knexConnection = knex(knexDefaultSetting);
