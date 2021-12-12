import { SjStringUtil } from "./SjStringUtil";

export namespace SjLogUtil {
    export const warn = (value: any): void => console.warn(SjStringUtil.any2String(value));
    export const error = (value: any): void => console.error(SjStringUtil.any2String(value));
    export const deprecate = (value: any): void => console.log(SjStringUtil.any2String(value));
    export const debug = (value: any): void => console.log(SjStringUtil.any2String(value));
}