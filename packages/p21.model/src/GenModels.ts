import { AbsIdBaseModel } from ".";

export interface MemoModel extends AbsIdBaseModel {
    'id': number;
    'message'?: string | null;
    'createdAt'?: Date | null;
    'updatedAt'?: Date | null;
}
export interface TestTableModel extends AbsIdBaseModel {
    'id': number;
    'name'?: string | null;
    'description'?: string | null;
}

export interface UserModel {
    'id': number;
    'email'?: string | null;
    'createdAt'?: Date | null;
    'updatedAt'?: Date | null;
}