import { AbsModel } from "@sejong/model";

export abstract class AbsBiz<M extends AbsModel> {

    protected showName(model:M):void {
        console.log(model)
    }
}