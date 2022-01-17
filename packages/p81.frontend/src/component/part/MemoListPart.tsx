import { SjLogUtil } from "@sejong/common";
import { MemoListModel } from "@sejong/model";
import { AbsValueOwnComponentProp } from "@sejong/react.common";
import { request } from "graphql-request";
import { ReactElement, useEffect, useState } from "react";
import { ErrorPart } from "./ErrorPart";
import { MemoItemWidget } from "../widget/MemoItemWidget";

// const enum NetworkStatus { READY, LOADING, LOADING_OK, LOADING_ERROR }

const endpoint = "http://localhost:5000/graphql";
const query = `{
  getMemoList(memo: {}) {
  }
}`;

interface MemoListPartProp extends AbsValueOwnComponentProp<MemoListModel> {
    error?:Error;
    isLoading:boolean;
}

export const MemoListPart = (): ReactElement => {

    // state
    const [memoListPartProp, setMemoListPartProp] = useState(
        { isLoading: true } as MemoListPartProp);

    // effect => componentDidMount/DidUpdate
    // https://xiubindev.tistory.com/100
    // 1. 최초한번만 실행 : useEffect(()=>{},[]) 
    // 2. 랜더링시마다 매번 실행 : useEffect(()=>{})
    // 3. 특정prop,state 가 바뀔 때 실행 : useEffect(()=>{},[prop or state])
    // 4. cleanup 함수 : 컴포넌트가 언마운트 될 때 수행 됨.
    // ** 주로 props 를 감시하다가 변화발생시 props 변화에 대응하는 state값을 변경
    useEffect(() => {
        // effect
        SjLogUtil.debug("MemoListPart useEffect -> effect");
        request(endpoint, query).then((data: unknown) =>{
            SjLogUtil.debug("success request!!!");
            console.log(JSON.stringify(data, null, 2));
            setMemoListPartProp({ isLoading: false, value: data } as MemoListPartProp);
        }).catch(e=>{
            console.log(e.toString());
            setMemoListPartProp({ isLoading: false, error: e } as MemoListPartProp);
        });
        return () => {
            // cleanup
            SjLogUtil.debug("MemoListPart useEffect -> cleanup");
        }
    }, []);

    console.log("MemoListPart");

    const html = () => {
        if (memoListPartProp.isLoading ) {
            return <div>Loading...</div>;
        } else if (memoListPartProp.error ) {
            return <ErrorPart error={memoListPartProp.error}/>;
        } else {
            const memos = memoListPartProp.value.models;
            SjLogUtil.debug("memoListPartProp #2 => " + JSON.stringify(memoListPartProp, null, 2));
            SjLogUtil.debug("memos #2 => " + memos);
            return <div>{memos.map(memo => (
                <MemoItemWidget value={memo}></MemoItemWidget>
            ))}
                LoadingOk... {JSON.stringify(memoListPartProp.value, null, 2)}</div>;
        }
    };

    return (
        <div>
            MemoListPart
            {html()}
        </div>
    );
}
