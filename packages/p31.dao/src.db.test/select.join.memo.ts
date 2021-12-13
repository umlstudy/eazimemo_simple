/* tslint:disable await-promise */

import { SjLogUtil } from '@sejong/common';
import { Knex } from 'knex';
import { knexConnection } from '../src/KnexConfig';

// 실행
// ts-node packages/p31.dao/src.db.test/select.join.memo.ts
const mainReal = async (knex: Knex): Promise<void> => {

    const result = await knex.select()
        .from('memo')
        .join(
            'user',
            'memo.email',
            'user.email'
        );
    console.log(result);
}

const main = async () => {
    await mainReal(knexConnection);
    SjLogUtil.debug('end');
};

main();
