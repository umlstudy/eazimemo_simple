import { SjLogUtil } from "@sejong/common";
import { AppAction } from "./action/AppAction";
import { AppStore } from "./AppStore";

// ts-node packages/p71.frontend.biz/src/AppStoreTester.ts
async function main() {
    AppStore.dispatch(AppAction.INC.act());
    AppStore.dispatch(AppAction.INC.act());
    AppStore.dispatch(AppAction.INC.act());
    AppStore.dispatch(AppAction.INC.act());
    AppStore.dispatch(AppAction.INC.act());
    SjLogUtil.debug(AppStore.getState());
}

main();
