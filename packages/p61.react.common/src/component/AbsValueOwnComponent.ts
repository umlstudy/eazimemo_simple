import { AbsComponent } from "./AbsComponent";

export type ValueChangeListener<T> = (value:T)=>void;

export abstract class AbsValueOwnComponent<T> extends AbsComponent {

    private valueChangeListener?: ValueChangeListener<T>;

    constructor(props:any, valueChangeListener?: ValueChangeListener<T>) {
        super(props);
        this.valueChangeListener = valueChangeListener;
    }

    protected getValueChangeListener():ValueChangeListener<T>|null {
        return this.valueChangeListener??null;
    }
}
