import { AbsComponent, AbsComponentProp } from "./AbsComponent";

export type ValueChangeListener<T> = (value:T)=>void;

export interface AbsValueOwnComponentProp<T> extends AbsComponentProp {
    value:T;
}

export abstract class AbsValueOwnComponent<T> extends AbsComponent {

    private valueChangeListener?: ValueChangeListener<T>;
    private readonly value:T;

    constructor(props: AbsValueOwnComponentProp<T>, valueChangeListener?: ValueChangeListener<T>) {
        super(props);
        this.valueChangeListener = valueChangeListener;
        this.value = props.value;
    }

    protected getValueChangeListener():ValueChangeListener<T>|null {
        return this.valueChangeListener??null;
    }

    protected getValue():T {
        return this.value;
    }
}
