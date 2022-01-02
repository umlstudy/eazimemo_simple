
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

    export const copyArray = (src: any[]): any[] => {
        const to: any[] = [];
        for (var key in src) {
            to[key] = src[key];
        }
        return to;
    };

    export const putAll = (to: any, src: any): void => {
        for (var key in src) {
            to[key] = src[key];
        }
    };

    // export const contains = (items: any[], matcher: Matcher<any>): boolean => {
    //     if (SjDataUtil.findItem(items, matcher) == null) {
    //         return false;
    //     }
    //     return true;
    // };

    // export const findItem = (items: any[], matcher: Matcher<any>): any => {
    //     SjAssertUtil.mustTrue(!!items, "!!items");
    //     SjAssertUtil.mustTrue(!!matcher, "!!matcher");

    //     for (let i: number = 0; i < items.length; i++) {
    //         if (matcher.match(items[i])) {
    //             return items[i];
    //         }
    //     }
    //     return null;
    // };
    export const keys = (map: any): any[] => {
        let arr: any[] = [];
        for (var key in map) {
            arr.push(key);
        }
        return arr;
    };
    export const values = (map: any): any[] => {
        let arr: any[] = [];
        for (var key in map) {
            arr.push(map[key]);
        }
        return arr;
    };
    // export const filter = (items: any[], filter: Filter): any[] => {
    //     let arr: any[] = [];
    //     for (let i: number = 0; i < items.length; i++) {
    //         if (filter.accept(items[i])) {
    //             arr.push(items[i]);
    //         }
    //     }
    //     return arr;
    // };
    export const deepCopy = (item: any): any => {
        return JSON.parse(JSON.stringify(item));
    };
    export const jsonToString = (item: any): any => {
        return JSON.stringify(item);
    };
    export const sort = (items: any[], compareFn: any): any[] => {
        return items.sort(compareFn);
    };
    export const sortMap = (map: any, compareFn: any): any[] => {
        let values = SjDataUtil.values(map);
        return SjDataUtil.sort(values, compareFn);
    };
    export const removeItemOnList = (list: any[], item: any): boolean => {
        let pos = SjDataUtil.getItemPositionOnList(list, item);
        if (pos < 0) {
            return false;
        } else {
            list.splice(pos, 1);
            return true;
        }
    };
    export const getItemPositionOnList = (list: any[], item: any): number => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == item) {
                return i;
            }
        }
        return -1;
    };
    export const pushAll = (dest: any[], src: any[]) => {
        if (!SjDataUtil.isNullOrUndefined(src)) {
            for (let i = 0; i < src.length; i++) {
                dest.push(src[i]);
            }
        }
    };
    // export const pushAll2 = <T>(dest: StringKeyMap<T>, src: StringKeyMap<T>) => {
    //     let keys = SjDataUtil.keys(src);
    //     for (let i = 0; i < keys.length; i++) {
    //         dest[keys[i]] = src[keys[i]];
    //     }
    // };
    // export const applyValues = <T>(dest: any, src: StringKeyMap<T>) => {
    //     let keys = SjDataUtil.keys(src);
    //     for (let i = 0; i < keys.length; i++) {
    //         let srcKey = keys[i];
    //         if (srcKey.indexOf(".") > 0) {
    //             var splitedKeys = srcKey.split(".");
    //             let destObj = null;
    //             for (let i = 0; i < (splitedKeys.length - 1); i++) {
    //                 destObj = dest[splitedKeys[i]];
    //                 if (!destObj) {
    //                     destObj = {};
    //                     dest[splitedKeys[i]] = destObj;
    //                 }
    //             }
    //             let lastKey = splitedKeys[splitedKeys.length - 1];
    //             destObj[lastKey] = src[keys[i]];
    //         } else {
    //             dest[keys[i]] = src[keys[i]];
    //         }
    //     }
    // };
    export const stringToBoolean = (str: string): boolean => {
        if (SjDataUtil.isNullOrUndefined(str)) {
            return false;
        }
        switch (str.toLowerCase().trim()) {
            case "true": case "yes": case "1": return true;
            case "false": case "no": case "0": case null: return false;
            default: return Boolean(str);
        }
    };
    export const safeNumber = (oriNum: number, newNum: number): number => {
        if (SjDataUtil.isNullOrUndefined(oriNum)) {
            return newNum;
        }
        return oriNum;
    };
    export const safeString = (oriStr: string, newStr: string): string => {
        if (SjDataUtil.isNullOrUndefined(oriStr)) {
            return oriStr;
        }
        return newStr;
    }
}