import { SjDataUtil } from './SjDataUtil';
import { sprintf } from "sprintf-js";

export namespace SjNumberUtil {
	export const comma = (num: number): string => {
		return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	};
	export const isNumber = (val: any): boolean => {
		if (!SjDataUtil.isNullOrUndefined(val)) {
			return !isNaN(Number(val));
		}
		return false;
	};
	export const fillZero = (val: number, digits: number): string => {
		let formatStr = sprintf("%s%dd", "%0", digits);
		return sprintf(formatStr, val);
	};
	export const convert2String = (val: number): string => {
		if (SjNumberUtil.isNumber(val)) {
			if (val % 1 === 0) {
				return sprintf("%d", val);
			} else {
				return sprintf("%f", val);
			}
		} else {
			return '';
		}
	};
	export const convert2CommaString = (val: number): string => {
		if (SjNumberUtil.isNumber(val)) {
			let n = val.toString(), p = n.indexOf('.');
			return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
				return p < 0 || i < p ? ($0 + ',') : $0;
			});
		} else {
			return '';
		}
	};
	export const convert2Number = (val: string): number | null => {
		if (SjNumberUtil.isNumber(val)) {
			return Number(val);
		} else {
			return null;
		}
	};
	export const getValueOf = (num: Number, defaultValue: number = 0): number => {
		if (!!num) {
			return num.valueOf();
		} else {
			return defaultValue;
		}
	}
}