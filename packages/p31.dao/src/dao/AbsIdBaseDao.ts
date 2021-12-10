import { SjAssertUtil } from "@sejong/common";
import { AbsIdBaseModel } from "@sejong/model";
import { AbsDao } from "./AbsDao";

export abstract class AbsIdBaseDao<M extends AbsIdBaseModel> extends AbsDao<M> {

    protected abstract getTableName(): string;

    public async whereByPrimaryKey(table: any, model: M): Promise<any> {
        const id = model.id;
        SjAssertUtil.mustNotNull(id, "id is null. model is " + model);
        return table.where('id', id);
    }

    protected getCountColumn(): string {
        return 'id';
    }
}