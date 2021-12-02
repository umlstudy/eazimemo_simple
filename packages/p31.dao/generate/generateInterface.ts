import sqlts from '@rmp135/sql-ts'

// 실행
// npx ts-node packages/p31.dao/generate/generateInterface.ts

// https://github.com/rmp135/sql-ts

const config = {
    "client": "sqlite3",
    "connection": {
        filename: "./mydb.sqlite"
    }
};

async function main() {
    const definitions = await sqlts.toObject(config)
    const tsString = sqlts.fromObject(definitions, config)
    console.log(tsString);
}

main();