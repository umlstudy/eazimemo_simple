/* eslint-disable @typescript-eslint/no-namespace */
/* tslint:disable await-promise */

import { SjLogUtil } from '@sejong/common';
import { Knex } from 'knex';
import { knexConnection } from '../src/KnexConfig';

// 실행
// ts-node packages/p31.dao/src.migration/initial.db.sqlite.ts

// https://dev.to/asteinarson/typescript-node-js-importing-knex-into-es6-module-1poc
// https://www.daleseo.com/js-dotenv/
// https://github.com/bkonkle/node-knex-typescript-example/blob/master/src/utils/MigrationUtils.ts

// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
module DbInitializer {

    // user.user_name 추가
    const CURRENT_DB_VERSION = 3;

    export const up = async (knex: Knex):Promise<void> => {
        await createMemoTable(knex);
    }

    const createMemoTable = async (knex: Knex):Promise<void> => {

        // db_version
        {
            const tableName = 'db_version';
            const exists = await knex.schema.hasTable(tableName);

            if (!exists) {
                // 1 테이블생성
                await knex.schema.createTable(tableName, table => {
                    table.increments('id')
                    table.integer("version").notNullable();
                    table.timestamp("created_at").defaultTo(knex.fn.now());
                    table.timestamp("updated_at").defaultTo(knex.fn.now());
                });

                // 2 기본값 입력
                await knex(tableName).insert([
                    { version: 3 }
                ]);
            }
        }

        // memo
        {
            const tableName = 'memo';
            const exists = await knex.schema.hasTable(tableName);
    
            if (!exists) {
                // 1 테이블생성
                await knex.schema.createTable(tableName, table => {
                    table.increments('id')
                    table.string("message").notNullable();
                    table.string("creator_email").notNullable();
                    table.string("updater_email").notNullable();
                    table.timestamp("created_at").defaultTo(knex.fn.now());
                    table.timestamp("updated_at").defaultTo(knex.fn.now());
                });
            }
        }

        // user
        {
            const tableName = 'user';
            const exists = await knex.schema.hasTable(tableName);

            if (!exists) {
                // 1 테이블생성
                await knex.schema.createTable(tableName, table => {
                    table.increments('id')
                    table.string("email").notNullable();
                    table.string("name").notNullable();
                    table.timestamp("created_at").defaultTo(knex.fn.now());
                    table.timestamp("updated_at").defaultTo(knex.fn.now());
                });
            }
        }

        await dbUpdateIfNeeded(knex);
    }

    const dbUpdateIfNeeded = async (knex: Knex): Promise<void> => {

        SjLogUtil.debug('db update');
        const versionSelect = await knex.select('version').from('db_version');
        const versionGetFirst = (versionSelect as any)[0];
        let version = (versionGetFirst as any).version as number;
        SjLogUtil.debug('version => ' + version);
        
        await knex.transaction(async (trx):Promise<Knex.Transaction> => {
            while ( version < CURRENT_DB_VERSION ) {
                version ++;

                console.log("transaction start...");
                if ( version == 2 ) {
                    await trx.raw(`alter table memo add column email varchar(50)`);
                    // await trx.raw(`update memo set email='none@email'`);
                    // not null 제약 추가 ( sqlite는 지원 안됨. 
                    // 테이블 다른 이름으로 생성 -> 데이터 이동 -> 기존 테이블 삭제
                    // -> 테이블 명 변경
                    await trx.raw(`update db_version set version=2`);
                }

                if (version == 3) {
                    await trx.raw(`alter table user add column name varchar(50)`);
                    await trx.raw(`update db_version set version=3`);
                }
            }
            return trx;
        });
    }
}

const main = async () => {
    await DbInitializer.up(knexConnection);
    SjLogUtil.debug('end');
};

main();
