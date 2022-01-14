import React from "react";

export interface AbsComponentProp {
    children: any;
}
export abstract class AbsComponent extends React.Component  {
    constructor(props: AbsComponentProp) {
        super(props);
    }
}
