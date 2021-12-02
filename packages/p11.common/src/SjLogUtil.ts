import { SjStringUtil } from "./SjStringUtil";

export class SjLogUtil {
    public static warn(value: any): void { console.warn(SjStringUtil.any2String(value)); }
    public static error(value: any): void { console.error(SjStringUtil.any2String(value)); }
    public static deprecate(value: any): void { console.log(SjStringUtil.any2String(value)); }
    public static debug(value: any): void { console.log(SjStringUtil.any2String(value)); }
}