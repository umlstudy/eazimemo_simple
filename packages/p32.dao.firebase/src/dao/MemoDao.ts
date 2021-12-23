import { Knex } from "knex";
import { AbsMemoDao } from "./AbsMemoDao";


// 자동생성된 코드
export class MemoDao extends AbsMemoDao {

    public static readonly INS = new MemoDao();

    protected joining(queryBuilder: Knex.QueryBuilder): Knex.QueryBuilder {
        queryBuilder = queryBuilder.join('user', 'user.email', 'memo.email')
            ;
        return queryBuilder;
    }
}
