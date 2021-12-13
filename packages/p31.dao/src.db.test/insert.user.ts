/* tslint:disable await-promise */

import { SjLogUtil } from '@sejong/common';
import { Knex } from 'knex';
import { knexConnection } from '../src/KnexConfig';

// 실행
// ts-node packages/p31.dao/src.db.test/insert.user.ts
const mainReal = async (knex: Knex): Promise<void> => {

    await knex.transaction(async (trx): Promise<Knex.Transaction> => {
        await trx('user').insert([
            { email: "umlstudy@gmail.com",
            name : "개똥이" }
        ]);
        await trx('memo').insert([
            {
                message: "개똥이가 작성했슈",
                email: "umlstudy@gmail.com"
            }
        ]);
        return trx;
    });
}

const main = async () => {
    await mainReal(knexConnection);
    SjLogUtil.debug('end');
};

main();
