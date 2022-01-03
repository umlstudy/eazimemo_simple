import { knexConnection } from '../../KnexConfig';
import { SjKnexSchemaUtil } from './SjKnexSchemaUtil';

// 실행
// ts-node packages/p31.dao/src/util/knex/SjKnexUtilTester.ts

async function main() {
    const database = knexConnection;
    const columns = await SjKnexSchemaUtil.extractColumns4Gql(database, "memo");

    for ( const key in columns) {
        console.log(key + " -> " + columns[key]);
    };
}

main();