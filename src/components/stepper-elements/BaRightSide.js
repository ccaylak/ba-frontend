import React from "react";
import {Button, Col, Divider, Form, Input, notification, Row, Space} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";

function BaRightSide(props) {

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Änderungen gespeichert',
            description:
                'Die erfassten Daten des PDF-Dokuments wurden verändert.',
        });
    };

    const onFinish = (values) => {
        console.log("Success:", values);
        localStorage.setItem("acknowledgmentData", JSON.stringify(values));
        openNotificationWithIcon('info');
    };


    return (
        <>
            {contextHolder}
            <Space direction={"vertical"} size={"small"} style={{padding: "0 3%"}}>
                <Row justify="center" align="middle">
                    <Col>
                        <h2>{props.title}</h2>
                    </Col>
                </Row>
                <Form initialValues={{
                    requestedCourse: props.requestedCourse,
                    originUniversity: props.originUniversity,
                    originCourse: props.originCourse,
                }} onFinish={onFinish}>
                    <Row justify="space-around">
                        <Col span={10}>
                            <Form.Item
                                label="Angefragter Studiengang" labelCol={{span: 24}} wrapperCol={{span: 24}}
                                name={"requestedCourse"}
                                rules={[{
                                    required: true,
                                    message: "Bitte einen einen Wert für den Ursprungsstudiengang eingeben"
                                }]}
                            >
                                <Input value/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label="Ursprungshochschule" labelCol={{span: 24}} wrapperCol={{span: 24}}
                                name={"originUniversity"}
                                rules={[{
                                    required: true,
                                    message: "Bitte einen Wert für die Ursprungshochschule eintragen"
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Ursprungsstudiengang" labelCol={{span: 24}} wrapperCol={{span: 24}}
                                name={"originCourse"}
                                rules={[{
                                    required: true,
                                    message: "Bitte einen Wert für den Ursprungsstudiengang eintragen"
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider plain>Pflichtmodule</Divider>
                    <Form.List name={"regularModules"} initialValue={props.regularModules}>
                        {(fields) => {
                            return (
                                <>
                                    {fields.map((field, index) => (
                                        <Row key={field.key} justify="space-around" align="middle">
                                            <Col span={2}>
                                                <Form.Item
                                                    label={`Modul-${index + 1}`}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.key, 'requestedModuleId']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label="Angefragtes Modul"
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.name, 'requestedModule']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    label="ECTS"
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.name, 'requestedEcts']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={1}>
                                                <ArrowRightOutlined style={{verticalAlign: 'middle'}}/>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label="Ursprungsmodul"
                                                    name={[field.name, 'originModule']}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    label="ECTS"
                                                    name={[field.name, 'originEcts']}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    label="Note"
                                                    name={[field.name, 'originGrade']}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            )
                        }}
                    </Form.List>
                    <Divider plain>Wahlpflichtmodule</Divider>
                    <Form.List name={"electiveModules"} initialValue={props.electiveModules}>
                        {(fields) => {
                            return (
                                <>
                                    {fields.map((field, index) => (
                                        <Row key={field.key} justify="space-around" align="middle">
                                            <Col span={2}>
                                                <Form.Item
                                                    label={`Modul-${index + 1}`}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.key, 'requestedModuleId']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label="Angefragtes Modul"
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.name, 'requestedModule']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    label="ECTS"
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                    name={[field.name, 'requestedEcts']}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={1}>
                                                <ArrowRightOutlined style={{fontSize: '16px'}}/>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label="Ursprungsmodul"
                                                    name={[field.name, 'originModule']}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    label="ECTS"
                                                    name={[field.name, 'originEcts']}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Form.Item
                                                    label="Note"
                                                    name={[field.name, 'originGrade']}
                                                    labelCol={{span: 24}} wrapperCol={{span: 24}}
                                                >
                                                    <Input/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            )
                        }}
                    </Form.List>
                    <Button type={"primary"} htmlType={"submit"}>Speichern</Button>
                </Form>
            </Space>
        </>
    );
}

export default BaRightSide;
