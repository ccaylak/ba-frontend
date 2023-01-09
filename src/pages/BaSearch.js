import {Col, List, Row} from "antd";
import Search from "antd/es/input/Search";
import {BugOutlined, TeamOutlined, TrophyOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Link} from "react-router-dom";


const searchResults = [
    {
        university: "IT-Center Dortmund",
        course: "IT- und Softwaresysteme",
        icon: <BugOutlined/>,
    },
    {
        university: "Fachhochschule Dortmund",
        course: "Praktische Informatik",
        icon: <TrophyOutlined/>,
    },
    {
        university: "Technische Universität Dortmund",
        course: "Informatik",
        icon: <TeamOutlined/>,
    }
];

function BaSearch() {

    const [courses, setCourses] = useState([]);

    function initCourses() {
        setCourses(searchResults);
    }

    return (
        <>
            <PageHeader
                title="Suche"
            />
            <Row justify="left" align="middle">
                <Col span={5}>
                    <Search
                        placeholder="Suchen"
                        onSearch={initCourses}
                        enterButton/>
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col span={18}>
                    <List
                        itemLayout="horizontal"
                        dataSource={courses}
                        renderItem={searchResult => (
                            <List.Item actions={[<Link to="/search/result">ansehen</Link>]}>
                                <List.Item.Meta
                                    title={searchResult.university}
                                    description={searchResult.course}
                                    avatar={searchResult.icon}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
}

export default BaSearch;
