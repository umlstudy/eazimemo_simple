import { AbsValueOwnComponent, AbsValueOwnComponentProp } from "../../AbsValueOwnComponent";

export default class SjText extends AbsValueOwnComponent<string> {
    constructor() {
        super({} as AbsValueOwnComponentProp<string>);
    }
}