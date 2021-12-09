/* tslint:disable await-promise */

import { SjLogUtil } from '@sejong/common';
import { Knex } from 'knex';
import { knexConnection } from '../src/KnexConfig';

// 실행
// ts-node packages/p31.dao/src.migration/initial.without.schema.ts

// https://dev.to/asteinarson/typescript-node-js-importing-knex-into-es6-module-1poc
// https://www.daleseo.com/js-dotenv/
// https://github.com/bkonkle/node-knex-typescript-example/blob/master/src/utils/MigrationUtils.ts

class DbInitializer {

    static async up(knex: Knex):Promise<void> {
        await DbInitializer.createMemoTable(knex);
    }

    static async createMemoTable(knex: Knex):Promise<void> {

        const tableName = 'memo';
        const exists = await knex.schema.hasTable(tableName);

        // 1 테이블생성
        if (!exists) {
            await knex.schema.createTable(tableName, table => {
                table.increments()
                table.string("message")
                table.timestamp("created_at").defaultTo(knex.fn.now());
                table.timestamp("updated_at").defaultTo(knex.fn.now());
            });
        }

        // 2 기본값 입력
        // await knex(tableName).insert([
        //     { message: "message" }
        // ])
    }
}

async function main() {
    await DbInitializer.up(knexConnection);
    SjLogUtil.debug('end');
}

main();
