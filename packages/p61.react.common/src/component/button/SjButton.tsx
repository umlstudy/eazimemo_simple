import { Button } from "@mui/material";
import * as React from 'react';
import { ReactElement } from "react";
import { AbsComponent } from "../AbsComponent";

interface SjButtonProp {
    reactElements: ReactElement[];
}
export default class SjButton extends AbsComponent {

    private reactElements: ReactElement[];

    constructor(props: SjButtonProp) {
        super(props);
        this.reactElements = props.reactElements;
        console.log("버튼 테스트중 const = >" + this.reactElements)
    }

    public render(): ReactElement {
        console.log("버튼 테스트중 = 111>" )
        return (<Button variant="contained">
            버튼 테스트중
        </Button>);
    }
}
