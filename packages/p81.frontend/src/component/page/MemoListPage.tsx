import { AbsValueOwnComponent, AbsValueOwnComponentProp } from "@sejong/react.common";
import { MemoListModel } from "@sejong/model";
import { ReactElement } from "react";
import { MemoListPart } from "../part/MemoListPart";

export interface MemoListPageProp extends AbsValueOwnComponentProp<MemoListModel> {
}

export default class MemoListPage extends AbsValueOwnComponent<MemoListModel> {
    constructor(props: MemoListPageProp) {
        super(props);
    }

    public render(): ReactElement {
        console.log("MemoListPage")
        return (<div>
            <div>메모목록</div>
            <MemoListPart/>
        </div>);
    }
}