/* tslint:disable await-promise */

import { SjLogUtil } from '@sejong/common';
import { Knex } from 'knex';
import { knexConnection } from '../src/KnexConfig';
import { MemoModel, UserModel } from '@sejong/model'

// 실행
// ts-node packages/p31.dao/src.db.test/select.join.memo.nested.ts

// Getting nested data when using Joins
// https://github.com/knex/knex/issues/882
const mainReal = async (knex: Knex): Promise<void> => {

    const result = await knex/* .select('message', 'user.email', 'user.name') */
        .from('memo')
        .join(
            'user',
            'memo.email',
            'user.email'
        )
        .options({ nestTables: true }) // 작동안함 only mysql?
        ;

    // mix interface
    type MemoUserModel = MemoModel & UserModel;
    const memoUserModel = result[0] as MemoUserModel;

    console.log(memoUserModel);
}

const main = async () => {
    await mainReal(knexConnection);
    SjLogUtil.debug('end');
};

main();
