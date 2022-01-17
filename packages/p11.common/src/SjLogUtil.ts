import { SjStringUtil } from "./SjStringUtil";

export namespace SjLogUtil {
    export const warn = (value: any): void => console.warn("warn : " + SjStringUtil.any2String(value));
    export const error = (value: any): void => console.error("error : " + SjStringUtil.any2String(value));
    export const deprecate = (value: any): void => console.log("deprecate : " + SjStringUtil.any2String(value));
    export const debug = (value: unknown): void => console.log("debug : " + SjStringUtil.any2String(value));
};