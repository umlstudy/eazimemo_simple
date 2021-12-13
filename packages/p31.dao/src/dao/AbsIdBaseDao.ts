import { SjAssertUtil, SjChangeCaseUtil } from "@sejong/common";
import { AbsIdBaseModel } from "@sejong/model";
import { Knex } from "knex";
import { AbsDao } from "./AbsDao";

export abstract class AbsIdBaseDao<M extends AbsIdBaseModel> extends AbsDao<M> {

    private getIdColumnName(): string {
        return SjChangeCaseUtil.convertCase(this.getTableName(), 'camel') + 'Id';
    };

    public getCountColumn(): string {
        return this.getIdColumnName();
    }

    protected whereByPrimaryKey(queryBuilder: Knex.QueryBuilder, model: M)
        : Knex.QueryBuilder {
        const idColumnName = this.getIdColumnName();
        const id = (model as any)[idColumnName];
        SjAssertUtil.mustNotNull(id, idColumnName + " is null. model is " + model);
        return queryBuilder.where(idColumnName, id);
    }
}