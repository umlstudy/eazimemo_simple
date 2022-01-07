import { Button } from "@mui/material";
import * as React from 'react';
import { ReactElement } from "react";
import { AbsComponent } from "../AbsComponent";

interface SjButtonProp {
    children: string;
}
export default class SjButton extends AbsComponent {

    private buttonLabel: string;

    constructor(props: SjButtonProp) {
        super(props);
        this.buttonLabel = props.children;
        console.log("버튼 테스트중 const = >" + this.buttonLabel)
    }

    public render(): ReactElement {
        console.log("버튼 테스트중 = 111>" )
        return (<Button variant="contained">
            버튼 테스트중 {this.buttonLabel}
        </Button>);
    }
}
