export class SjDataUtil {

    public static isNullOrUndefined(value: any): boolean {
        if (value == null || value == undefined) {
            return true;
        } else {
            return false;
        }
    }

    public static isNotNullOrUndefined(value: any): boolean {
        return !SjDataUtil.isNullOrUndefined(value);
    }
}