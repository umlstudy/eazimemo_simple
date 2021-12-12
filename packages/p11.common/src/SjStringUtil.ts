
export namespace SjStringUtil {
    export const any2String = (value: any): string => {
        if (typeof value === 'string' || value instanceof String ) {
            return value as string;
        } else {
            return new String(value) as string;
        }
    };
}