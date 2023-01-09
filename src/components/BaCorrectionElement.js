import {Button, Col, Input, Row} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

function BaCorrectionElement(props) {
    return (
        <>
            <Row>
                <Col align="left">
                    <h3>Ursprungsmodul</h3>
                </Col>
            </Row>
            <Row justify={"space-evenly"}>
                <Col span={9}>
                    <Input addonBefore="Name"/>
                </Col>
                <Col span={15} />
            </Row>
            <Row justify="space-evenly">
                <Col span={9}>
                    <Input addonBefore="ECTS"/>
                </Col>
                <Col span={9}>
                    <Input addonBefore="Note"/>
                </Col>
                <Col span={2}>
                    <Button icon={<DeleteOutlined/>}/>
                </Col>
            </Row>
        </>
    );
}

export default BaCorrectionElement;