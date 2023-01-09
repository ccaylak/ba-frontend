import {Menu} from 'antd';

import {SearchOutlined, FilePdfOutlined, HighlightOutlined, PlayCircleOutlined} from '@ant-design/icons';

import {Link} from "react-router-dom";

const routes = [
    {
        label: <Link to="/equivalence/enter">Äquivalenz einpflegen</Link>,
        key: 'equivalence-enter',
        icon: <FilePdfOutlined/>,
    },
    {
        label: <Link to="/equivalence/check">Äquivalenz überprüfen</Link>,
        key: 'equivalence-check',
        icon: <HighlightOutlined/>,
    },
    {
        label: <Link to="/acknowledgment/resume">Äquivalenz fortfahren</Link>,
        key: 'acknowledgment-resume',
        icon: <PlayCircleOutlined/>,
    },
    {
        label: <Link to="/search">Suche</Link>,
        key: 'search',
        icon: <SearchOutlined/>,
    },
]

function BaNavbar() {
    return (
        <Menu
            selectedKeys={"1"}
            theme={"dark"}
            mode="horizontal"
            items={routes}
        />
    );
}

export default BaNavbar;
