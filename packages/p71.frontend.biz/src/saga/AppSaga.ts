import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AppAction } from "../action/AppAction";
import { SjLogUtil } from "@sejong/common";

function* inc() {
    SjLogUtil.debug("inc called delay");
    yield delay(500);
    SjLogUtil.debug("inc called");
    yield put({ type: AppAction.INC.getSagaType(), value: 1 });
}

function* dec() {
    SjLogUtil.debug("dec called delay");
    yield delay(500);
    SjLogUtil.debug("dec called");
    yield put({ type: AppAction.DEC.getSagaType(), value: -1 });
}

export default function* rootSaga() {
    SjLogUtil.debug("rootSaga called #1");
    yield takeEvery(AppAction.INC.getType(), inc);
    SjLogUtil.debug("rootSaga called #2");
    yield takeLatest(AppAction.DEC.getType(), dec);
}