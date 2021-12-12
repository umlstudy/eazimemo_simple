import Handlebars from "handlebars";

export namespace SjTemplateUtil {
    export const convert = (source: string, data: any): string => {
        const template = Handlebars.compile(source);
        const result = template(data);
        return result;
    };
}