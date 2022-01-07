
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SjButton from "./SjButton";

// nodemon packages/p61.react.common/src/component/button/SjButton.test.tsx
// npx ts-node packages/p61.react.common/src/component/button/SjButton.test.tsx

// ts-node packages/p61.react.common/src/component/button/SjButton.test.tsx

let container:any = null;
beforeEach(() => {
    // 렌더링 대상으로 DOM 엘리먼트를 설정합니다.
    const aaa = document.createElement("div");
    container = aaa;
    document.body.appendChild(container);
});

afterEach(() => {
    // 기존의 테스트 환경을 정리합니다.
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with or without a name", () => {
    act(() => {
        render(<SjButton>ㅇ아앙</SjButton>, container);
    });
    expect(container.textContent).toBe("Hey, stranger");
});