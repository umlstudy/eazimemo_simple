import { SjDataUtil } from "./SjDataUtil";

export module SjAssertUtil {

    export const mustNotNull = (value:any, message?:string):void => {

        if (SjDataUtil.isNullOrUndefined(message) ) {
            message = "값이 비었습니다.";
        }
        if ( SjDataUtil.isNullOrUndefined(value) ) {
            throw new Error(message);
        }
    };
}