import { AbsIdBaseModel } from ".";

export interface MemoModel extends AbsIdBaseModel {
    id: number
    message: string
    createdAt: Date
    updatedAt: Date
    email: string
}

export interface UserModel extends AbsIdBaseModel {
    id: number
    email: string
    createdAt: Date
    updatedAt: Date
}

