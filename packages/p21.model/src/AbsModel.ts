import { FromToInfo } from "./FromToInfo";
import { PageInfo } from "./PageInfo";

export interface AbsModel {
    createdAtFromToInfo: FromToInfo;
    pageInfo: PageInfo;
    
    createdAt: Date;
    updatedAt: Date;
    creatorEmail: string;
    updaterEmail: string;
}