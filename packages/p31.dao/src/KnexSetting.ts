import { SjChangeCaseUtil } from "@sejong/common";

const knexSetting = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite'
        }
        ,
        debug: true
        ,
        wrapIdentifier: (value: string, origImpl: any, queryContext: any) => {
            console.log(queryContext);
            return origImpl(SjChangeCaseUtil.convertCase(value, 'pascal'));
        } 
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