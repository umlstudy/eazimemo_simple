import { AbsIdBaseModel, AbsListModel } from ".";

export interface MemoModel extends AbsIdBaseModel {
    message: string
}

export interface MemoListModel extends AbsListModel<MemoModel> {
}

export interface UserModel extends AbsIdBaseModel {
    email: string
    name: string
}

export interface UserListModel extends AbsListModel<UserModel> {
}

