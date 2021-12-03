import { AbsModel } from "@sejong/model";
export abstract class AbsDao<M extends AbsModel> {
    protected abstract getTableName():string;

    protected showName(model:M):void {
        console.log(model)
    }
}