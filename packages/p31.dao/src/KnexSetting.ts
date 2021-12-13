import { SjChangeCaseUtil } from "@sejong/common";

const knexSetting = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        }
        ,
        debug: true
        ,
        transformInput: (identifier: string):string => SjChangeCaseUtil.convertCase(identifier, 'snake')
        ,
        transformOutput: (identifier: string): string => SjChangeCaseUtil.convertCase(identifier, 'camel')
        // wrapIdentifier: (value: string, origImpl: any, queryContext: any) => {
        //     console.log(queryContext);
        //     return origImpl(SjChangeCaseUtil.convertCase(value, 'camel'));
        // } 
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};

export const knexDefaultSetting = knexSetting.development;