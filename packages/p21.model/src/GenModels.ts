import { AbsIdBaseModel } from "./AbsIdBaseModel";

export interface MemoModel extends AbsIdBaseModel {
    memoId: number
    message: string
    email: string
}

export interface UserModel extends AbsIdBaseModel {
    userId: number
    email: string
    name: string
}

