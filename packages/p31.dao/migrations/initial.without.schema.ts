/* tslint:disable await-promise */

import { LogUtil } from '@sejong/common';
import knex, { Knex } from 'knex';

// 실행
// npx ts-node packages/p31.dao/migrations/initial.without.schema.ts
async function connect(connection: Record<string, string>)
    : Promise<Knex<any, unknown[]>> {
    const conn = {
        client: 'sqlite3',
        connection
    }
    const knex_conn = knex(conn);
    return knex_conn;
}

// https://dev.to/asteinarson/typescript-node-js-importing-knex-into-es6-module-1poc
// https://www.daleseo.com/js-dotenv/
// https://github.com/bkonkle/node-knex-typescript-example/blob/master/src/utils/MigrationUtils.ts

async function up(knex: Knex) {

    const tableName = 'test_table';

    const exists = await knex.schema.hasTable(tableName);

    // 1 테이블생성
    if ( !exists ) {
        await knex.schema.createTable(tableName, table => {
            table.increments()
            table.string("name")
            table.string("description")
        });
    }

    // 2 기본값 입력
    await knex(tableName).insert([
        { name: "A", description: "A1" },
        { name: "B", description: "BB1" },
        { name: "C", description: "CCC1" },
        { name: "D", description: "DDDD1" }
    ])
}

const connectionInfo = {
    filename: "./mydb.sqlite"
};

async function main() {
    const knexConn = await connect(connectionInfo);
    await up(knexConn);
    LogUtil.debug('end');
}

main();
