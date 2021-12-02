import { StringUtil } from "./StringUtil";

export class LogUtil {
    public static warn(value: any): void { console.warn(StringUtil.any2String(value)); }
    public static error(value: any): void { console.error(StringUtil.any2String(value)); }
    public static deprecate(value: any): void { console.log(StringUtil.any2String(value)); }
    public static debug(value: any): void { console.log(StringUtil.any2String(value)); }
}