import { AbsValueOwnComponent, AbsValueOwnComponentProp } from "@sejong/react.common";
import { MemoListModel } from "@sejong/model";
import { ReactElement } from "react";

export interface MemoListPartProp extends AbsValueOwnComponentProp<MemoListModel> {
    value: MemoListModel;
}

export default class MemoListPart extends AbsValueOwnComponent<MemoListModel> {
    constructor(props: MemoListPartProp) {
        super(props);
    }

    public render(): ReactElement {
        console.log("MemoListPart")
        return (<div>
            MemoListPart
        </div>);
    }
}