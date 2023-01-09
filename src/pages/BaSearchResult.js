import {Button, Col, Divider, List, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

const data = {
    name: 'IT-Dortmund',
    type: 'university',
    courses: [
        {
            name: 'Informatik'
        },
        {
            name: 'BWL'
        },
        {
            name: 'Wirtschaftsinformatik'
        },
        {
            name: 'Praktische Informatik'
        },
    ]
};

function BaSearchResult(props) {
    return (
        <>
            <Row justify={"center"} align={"middle"}>
                <Col span={2}/>
                <Col span={20}>
                    <h1>{data.name}</h1>
                    <Divider/>
                    <List
                        grid={{gutter: 9, column: 2}}
                        dataSource={data.courses}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<RightOutlined/>}
                                    title={item.name}
                                />
                            </List.Item>
                        )}
                    >

                    </List>
                    <Divider/>
                    <Row justify={"center"}>
                        <Col>
                            <Button
                                type={"primary"}
                                icon={<LeftOutlined/>}
                            >
                                Zurück
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={2}/>
            </Row>
        </>
    );
}

export default BaSearchResult;