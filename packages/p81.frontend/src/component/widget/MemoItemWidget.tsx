import { MemoModel } from "@sejong/model";
import { AbsValueOwnComponentProp } from "@sejong/react.common";
import { ReactElement } from "react";

interface MemoItemWidgetProp extends AbsValueOwnComponentProp<MemoModel> {
}

export const MemoItemWidget = (props: MemoItemWidgetProp): ReactElement => {
    return (
        <div>
            메모 =&gt; {props.value.message}
        </div>
    );
}
