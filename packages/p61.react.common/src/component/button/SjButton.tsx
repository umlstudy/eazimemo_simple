import { Button } from "@mui/material";
import { AbsComponent } from "../AbsComponent";

export class SjButton extends AbsComponent {

    private buttonName: string;

    constructor(buttonName:string) {
        super({});
        this.buttonName = buttonName;
    }

    public render() {
        return (<Button variant="contained">
            ${this.buttonName}
        </Button>);
    }
}
