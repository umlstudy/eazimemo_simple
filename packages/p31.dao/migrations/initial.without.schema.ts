/* tslint:disable await-promise */

import knex, { Knex } from 'knex';

// 실행
// npx ts-node packages/p31.dao/migrations/initial.ts
async function connect(connection: Record<string, string>) {
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
    // const schema = MigrationUtils.schema(knex)

    // await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    // await knex.raw(`CREATE SCHEMA ${schemaName};`);

    // User
    await knex.schema.createTableIfNotExists('User', table => {
        // const columns = schema(table)
        // columns.primaryUuid()

        table.timestamps(true, true)

        // Fields
        table.string('username')
            .unique()
            //.notNullable()
            .comment(`The User''s login id - usually their email address.`)

        table.string('firstName')
            .comment(`The User''s first name.`)

        table.string('lastName')
            .comment(`The User''s last name.`)

        table.boolean('isActive')
            .comment(`If false, the User is suspended.`)
            //.notNullable()//.defaultTo(true)
    });

    // Address
    await knex.schema.createTableIfNotExists('Address', table => {
        // const columns = schema(table)
        // columns.primaryUuid()

        table.timestamps(true, true)

        // Fields
        table.string('line1').comment('The first line of the Address.')

        table.string('line2').comment('The second line of the Address.')

        table.string('city').comment('The city.')

        table.string('state').comment('The state or province.')

        table.string('country').comment('The country.')

        table.string('postalCode').comment('The zip or other postal code.')

        table.specificType('location', 'POINT')
            .comment('The latitude and longitude of the Address.')
    })

    // Event
    await knex.schema.createTableIfNotExists('Event', table => {
        // const columns = schema(table)
        // columns.primaryUuid()

        table.timestamps(true, true)

        // Fields
        table.string('name').notNullable().comment(`The Event''s name.`)

        table.text('description').comment(`The Event''s description`)

        // // Relationships
        // columns
        //     .foreignUuid('user', { column: 'id', table: `${Database.schema}.User` }, true)
        //     .comment('The User that created the Event.')

        // columns
        //     .foreignUuid('address', { column: 'id', table: `${Database.schema}.Address` })
        //     .comment(`The Event''s Address.`)
    })
}

// export function down(_knex: Knex) {
//     throw new Error('Downward migrations are not supported. Restore from backup.')
// }

const connectionInfo = {
    filename: "./mydb.sqlite"
};

connect(connectionInfo)
    .then((knexConn)=>up(knexConn));

