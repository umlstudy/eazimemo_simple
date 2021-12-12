export namespace SjDataUtil {

    export const isNullOrUndefined = (value: any): boolean => {
        if (value == null || value == undefined) {
            return true;
        } else {
            return false;
        }
    };

    export const isNotNullOrUndefined = (value: any): boolean => {
        return !SjDataUtil.isNullOrUndefined(value);
    };
}