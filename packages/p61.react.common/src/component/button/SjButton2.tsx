import { Button } from "@mui/material";
import * as React from 'react';
import { ReactElement } from "react";

export default class SjButton2 extends React.Component {

    public render(): ReactElement {
        console.log("====================>")
        return (<Button variant="contained">
            BBBBBBBBBBBBBBBBBBBB버튼테스트
        </Button>);
    }
}
