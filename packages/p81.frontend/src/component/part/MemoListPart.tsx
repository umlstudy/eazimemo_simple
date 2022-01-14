import { SjLogUtil } from "@sejong/common";
import { ReactElement, useEffect, useState } from "react";

const enum NetworkStatus { READY, LOADING, LOADING_OK, LOADING_ERROR }

export const MemoListPart = (): ReactElement => {

    // state
    const [networkStatus, setNetworkStatus] = useState(NetworkStatus.LOADING);

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
        setTimeout(() => { setNetworkStatus(NetworkStatus.LOADING_OK) }, 2000);
        return () => {
            // cleanup
            SjLogUtil.debug("MemoListPart useEffect -> cleanup");
        }
    }, []);

    console.log("MemoListPart");



    const html = () => {
        switch (networkStatus) {
            case NetworkStatus.LOADING: return <div>Loading...</div>;
            case NetworkStatus.READY: return <div>Ready...</div>;
            case NetworkStatus.LOADING_OK: return <div>LoadingOk...</div>;
            case NetworkStatus.LOADING_ERROR: return <div>LoadingERROR...</div>;
        }
    };

    return (
        <div>
            MemoListPart
            {html()}
        </div>
    );
}
