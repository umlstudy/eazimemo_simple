import { Button } from "@mui/material";
import { AbsComponent } from "../AbsComponent";

class SjText extends AbsComponent {

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

export default SjText;