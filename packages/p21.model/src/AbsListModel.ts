import { AbsModel } from "./AbsModel";

export interface AbsListModel<T extends AbsModel> extends AbsModel {
    models:T[];
}