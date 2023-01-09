import {Button, Col, Input, Row} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import BaEditList from "../components/BaEditList";

function BaEditCourse() {
    return (
        <>
            <Row>
                <Col span={1}/>
                <Col span={22}>
                    <Row justify="center">
                        <Col>
                            <h4>Studiengang</h4>
                            <Input placeholder={"Studiengang"}></Input>
                        </Col>
                    </Row>
                    <Row justify="space-evenly">
                        <BaEditList></BaEditList>
                    </Row>
                    <Row justify="space-evenly">
                        <Col span={4}>
                            <Button type="primary" icon={<SaveOutlined/>} size="large" block>Speichern</Button>
                        </Col>
                        <Col span={4}>
                            <Button type="danger" icon={<CloseOutlined/>} size="large" block>Verwerfen</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={1}/>
            </Row>
        </>
    );
}

export default BaEditCourse;
