import { sprintf } from "sprintf-js";
import { SjNumberUtil } from "./SjNumberUtil";
import { SjDataUtil } from "./SjDataUtil";

export namespace SjStringUtil {
    export const any2String = (value: any): string => {
        if (typeof value === 'string' || value instanceof String) {
            return value as string;
        } else {
            return new String(value) as string;
        }
    };

    export const isEmpty = (data: string): boolean => {
        if (typeof data === 'undefined' || data === null || data.length < 1) {
            return true;
        }
        return false;
    };

    export const isTrue = function (data: string): boolean {
        if (typeof data === 'undefined' || data === null || data.length < 1) {
            return false;
        }
        if ('true' == data) {
            return true;
        }
        return false;
    };

    export const safeString = (data: string): string => {
        if (!data) {
            return "";
        } else {
            return data;
        }
    };

    export const format = (formatStr: string, ...params: any[]): string => {
        // const paramsNew = <any[]>[formatStr].concat(params);
        return sprintf(formatStr, params);
    };

    export const contains = (fullStr: string, partStr: string) => {
        if (fullStr.indexOf(partStr) != -1) {
            return true;
        } else {
            return false;
        }
    };

    export const toString = (val: any): string => {
        let text_ = '';
        if (SjDataUtil.isNullOrUndefined(val)) {
            text_ = '';
        } else if (val instanceof String) {
            text_ = <string>val;
        } else if (val instanceof Number) {
            text_ = SjNumberUtil.convert2String(<number>val);
        } else {
            text_ = val.toString();
        }
        return text_;
    };

    export const maxString = (value: string): string => {
        if (!!value && value.length > 20) {
            value = value.substring(0, 20);
            value = value + "...";
        }
        return value;
    };

    export const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    export const compare = (s1: string, s2: string): number => {
        if (s1 === s2) {
            return 0
        }
        if (SjStringUtil.isEmpty(s1)) {
            return -1;
        }
        if (SjStringUtil.isEmpty(s2)) {
            return 1;
        }
        return s1.localeCompare(s2);
    };

    export const startsWith = (str: string, startStr: string): boolean => {
        if (SjStringUtil.isEmpty(str)) {
            return false
        }
        if (SjStringUtil.isEmpty(startStr)) {
            return false;
        }
        return str.indexOf(startStr) == 0;
    };

    export const endsWith = (subjectString: string, searchString: string) => {
        const position = subjectString.length - searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };

    export const prevSubstring = (str: string, lastDelimiter: string): string => {
        const idx = str.lastIndexOf(lastDelimiter);
        if (idx > 0) {
            return str.substring(0, idx);
        } else {
            throw Error(sprintf("there is no character (%s) contains in '%s'", lastDelimiter, str));
        }
    };

    export const multiByteSize = (str: string): number => {
        if (SjDataUtil.isNullOrUndefined(str)) {
            return 0;
        } else {
            let cnt = 0;
            for (let i = 0; i < str.length; i++) {
                str.charCodeAt(i) < 256 ? cnt++ : cnt += 2
            }
            return cnt;
        }
    };

    export const multiByteSizes = (str: string[]): number => {
        let cnt = 0;
        str.forEach((s) => { cnt += SjStringUtil.multiByteSize(s) });
        return cnt;
    };

    export const multiByteSubstr = (str_: string, from: number, multiByteLength: number): string => {
        if (SjDataUtil.isNullOrUndefined(str_)) {
            return '';
        }
        const str = str_.substr(from);
        let currentLength = 0;
        let pos = 0;
        for (; pos < str.length; pos++) {
            str.charCodeAt(pos) < 256 ? currentLength++ : (currentLength += 2);
            if (currentLength > multiByteLength) {
                break;
            }
        }
        return str.substr(0, pos);
    };

    export const concat = (strs: string[], dele: string) => {
        let retString = '';
        strs.forEach(str => {
            if (!SjStringUtil.isEmpty(retString)) {
                retString += dele;
            }
            retString += str;
        });
        return retString;
    };

    export const applyParamStringToObject = (paramString: string, toObject: any) => {
        const paramStrings = paramString.split('&');
        paramStrings.forEach(e => {
            const param = e as string;
            const token = param.split('=');
            if (token.length == 2) {
                toObject[token[0]] = token[1];
            }
        });
    };
}