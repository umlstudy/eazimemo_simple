import { AbsModel } from "@sejong/model";
export abstract class AbsDao<M extends AbsModel> {
    protected abstract getTableName():string;
}