import { SjAssertUtil, SjChangeCaseUtil } from "@sejong/common";
import { AbsIdBaseModel } from "@sejong/model";
import { AbsDao } from "./AbsDao";

export abstract class AbsIdBaseDao<M extends AbsIdBaseModel> extends AbsDao<M> {

    protected abstract getTableName(): string;

    private getIdColumnName(): string {
        return SjChangeCaseUtil.convertCase(this.getTableName(), 'camel') + 'Id';
    };

    protected async whereByPrimaryKey(table: any, model: M): Promise<any> {
        const idColumnName = this.getIdColumnName();
        const id = (model as any)[idColumnName];
        SjAssertUtil.mustNotNull(id, idColumnName + " is null. model is " + model);
        return await table.where(idColumnName, id);
    }

    protected getCountColumn(): string {
        return 'id';
    }
}