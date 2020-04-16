import React from "react";
import { render, cleanup } from 'react-testing-library';

import ESMenu, {
	ESItem,
	ESSubMenu,
	ESItemGroup
} from "../";
import ESIcon from "../../Icon";

afterEach(cleanup);

it("renders correctly", () => {
	const { getByText, asFragment } = render(
        <ESMenu mode="horizontal">
            <ESItem key="mail">
            <ESIcon type="mail" />Navigation One
            </ESItem>
            <ESItem key="app" disabled>
            <ESIcon type="appstore" />Navigation Two
            </ESItem>
            <ESSubMenu title={<span className="submenu-title-wrapper"><ESIcon type="setting" />Navigation Three - Submenu</span>}>
            <ESItemGroup title="Item 1">
                <ESItem key="setting:1">Option 1</ESItem>
                <ESItem key="setting:2">Option 2</ESItem>
            </ESItemGroup>
            <ESItemGroup title="Item 2">
                <ESItem key="setting:3">Option 3</ESItem>
                <ESItem key="setting:4">Option 4</ESItem>
            </ESItemGroup>
            </ESSubMenu>
            <ESItem key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </ESItem>
        </ESMenu>
	);

    getByText('Navigation One');
    expect(asFragment()).toMatchSnapshot();
});
