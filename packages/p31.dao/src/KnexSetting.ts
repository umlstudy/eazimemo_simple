import { SjChangeCaseUtil } from "@sejong/common";

const convertCaseAny4FlatJson = (row: any, convertCaseString: 'camel'): any => {
    const result = {} as any;
    if (row) {
        for ( const key in row ) {
            const newKey = SjChangeCaseUtil.convertCase(key, convertCaseString);
            // console.log("newKey => " + newKey);
            result[newKey] = row[key];
        }
    }
    return result;
};

const convertCaseAny = (result: any, convertCase: 'camel'):any => {
    if ( result ) {
        if (Array.isArray(result)) {
            // console.log("result => " + result);
            return result.map(row => convertCaseAny4FlatJson(row, convertCase));
        } else {
            // console.log("result => " + result);
            const converted = SjChangeCaseUtil.convertCase(result, convertCase);
            return converted;
        }
    }
};

const knexSetting = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        }
        ,
        debug: true
        ,
        // transformInput: (identifier: string):string => SjChangeCaseUtil.convertCase(identifier, 'snake')
        // ,
        // transformOutput: (identifier: string): string => SjChangeCaseUtil.convertCase(identifier, 'camel')
        wrapIdentifier: (value: string, origImpl: any, queryContext: any) => {
            if (queryContext) {
                console.log("queryContext => " + queryContext);
            }
            const pascalVal = SjChangeCaseUtil.convertCase(value, 'snake');
            // console.log("wrapIdentifier = > " + value + " => " + pascalVal);
            return origImpl(pascalVal);
        },
        postProcessResponse: (result: any, queryContext: any) => {
            if (queryContext) {
                console.log("queryContext => " + queryContext);
            }
            return convertCaseAny(result, 'camel');
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