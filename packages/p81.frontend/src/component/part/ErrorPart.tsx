import { ReactElement } from "react";

interface ErrorPartProp {
    error: Error;
}

export const ErrorPart = (props: ErrorPartProp): ReactElement => {
    return (
        <div>
            에러가 발생하였습니다. {props.error.message}
        </div>
    );
}
