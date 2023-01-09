import {Button, Col, Form, Input, Row} from "antd";
import {useEffect, useState} from "react";

function BaConclusionEquivalence() {

    const [acknowledgmentData, setAcknowledgmentData] = useState(JSON.parse(localStorage.getItem('acknowledgmentData')));

    useEffect(() => {
        let localStorageData = JSON.parse(localStorage.getItem('acknowledgmentData'));
        console.log("1")
        console.log(localStorageData);
        console.log("2")
        console.log(acknowledgmentData);
    }, []);

    return (
        <Row justify={"space-around"} align={"middle"}>
            <Col span={10}>
                <p>
                    Für die rechts aufgelisteten Module wurden keine äquivalenten Gegenstücke gefunden
                </p>
                <p>
                    Bitte kontaktieren Sie den entsprechenden Modulverantwortlichen oder überprüfen Sie ihr E-Mail
                    Postfach , ob die Referenz nur im System nicht hinterlegt ist.
                </p>
            </Col>
            <Col span={10}>
                <Form>
                    <Form.List name={"regularModules"} initialValue={acknowledgmentData.regularModules}>
                        {(fields) => {
                            return (
                                <>
                                    {fields.map((field, index) => (
                                        <Row justify={"space-around"} key={field.key} align={"middle"}>
                                            <Col span={2}>
                                                <Form.Item
                                                    label={"Modulnummer"}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.key, 'requestedModuleId']}
                                                >
                                                    <Input disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    label={"Angefragtes Modul"}
                                                    name={[field.key, 'requestedModule']}
                                                >
                                                    <Input disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    label={"ECTS"}
                                                    name={[field.key, 'requestedEcts']}
                                                >
                                                    <Input disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    label={"Ursprungsmodul"}
                                                    name={[field.key, 'originModule']}
                                                >
                                                    <Input disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    label={"ECTS"}
                                                    name={[field.key, 'originEcts']}
                                                >
                                                    <Input disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    label={"Note"}
                                                    name={[field.key, 'originGrade']}
                                                >
                                                    <Input disabled/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    label={"Anerkannte Note"}
                                                    name={[field.key, 'eigeneNote']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            );
                        }
                        }
                    </Form.List>
                    <Button>Fehlende Module Absenden</Button>
                    <Button>Pausieren</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default BaConclusionEquivalence;
