import { Action } from 'redux';

export class AppAction implements Action<string> {

    readonly type: string;

    private constructor(type: string) {
        this.type = type;
    }

    public getType(): string {
        return this.type;
    }

    public toString(): string {
        return this.type;
    }

    public getSagaType():string {
        return this.type + "_saga";
    }

    public act():any {
        return { type:this.type };
    }

    public static INC = new AppAction('INC');
    public static DEC = new AppAction('DEC');
    // 계속 추가...
}