import { AbsIdBaseModel } from ".";

export interface MemoModel extends AbsIdBaseModel {
    memoId: number
    message: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface UserModel extends AbsIdBaseModel {
    userId: number
    email: string
    name: string
    createdAt: Date
    updatedAt: Date
}

