import Handlebars from "handlebars";

export class SjTemplateUtil {
    public static convert(source: string, data: any): string {
        const template = Handlebars.compile(source);
        const result = template(data);
        return result;
    }
}