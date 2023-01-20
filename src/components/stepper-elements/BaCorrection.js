import {Button, Col, Divider, Form, Input, Row, Spin} from "antd";

import React, {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";

const BaCorrection = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [ocrData, setOcrData] = useState({});

    useEffect(() => {
        const fetchOcrData = async () => {

            const ocrResponse = await fetch("http://localhost:8080/ocr/acknowledgment/" + props.fileName);
            const ocrJson = await ocrResponse.json();

            setOcrData({
                originCourse: ocrJson.requestData.originCourse,
                originUniversity: ocrJson.requestData.originUniversity,
                requestedCourse: ocrJson.requestData.requestedCourse,
                regularModules: ocrJson.regularModules,
                electiveModules: ocrJson.electiveModules
            });
            setLoading(false);
        };

        fetchOcrData().catch();
    }, []);
    const submitFormHandler = (formData) => {
        props.onSubmitForm(formData);
    };

    let initialFormData = ocrData;

    const onResetFormHandler = () => {
        initialFormData = ocrData;
    };

    if (isLoading) {
        return (
            <Row justify={"space-evenly"} align={"middle"} style={{height: '70vh'}}>
                <Col span={24} align={"center"}>
                    <Spin tip={"Daten werden geladen..."} size="large"
                          style={{color: "white"}}
                          indicator={<LoadingOutlined style={{fontSize: 100}} spin/>}/>
                </Col>
            </Row>
        );
    }

    const getModuleFormList = (modules, label) => {
        return <Form.List name={label} initialValue={modules}>
            {(fields) => {
                return (
                    <>
                        {fields.map((field) => (
                            <Row key={field.key} justify="space-around">
                                <Col span={1}>
                                    <Form.Item
                                        label={"Nummer"}
                                        labelCol={{span: 24}} wrapperCol={{span: 24}}
                                        name={[field.key, 'requestedModuleId']}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Bitte die Kennnummer des angefragten Moduls angeben"
                                            }
                                            , {
                                                pattern: new RegExp(/^[0-9]{5}$/),
                                                message: "Bitte die fünfstellige Kennnummer des angefragten Moduls angeben"
                                            }
                                        ]}

                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Angefragtes Modul"
                                        labelCol={{span: 24}} wrapperCol={{span: 24}}
                                        name={[field.name, 'requestedModule']}
                                        rules={[{
                                            required: true,
                                            message: "Bitte den Namen des angefragten Moduls angeben"
                                        }]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={1}>
                                    <Form.Item
                                        label="ECTS"
                                        labelCol={{span: 24}} wrapperCol={{span: 24}}
                                        name={[field.name, 'requestedEcts']}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Bitte die ECTS des angefragten Moduls angeben"
                                            },
                                            {
                                                pattern: new RegExp(/^[0-9]{1,2}(,[0-9])?$/),
                                                message: "Bitte die ECTS des angefragten Moduls im 'XX,X' oder 'X,X' Format angeben"
                                            }
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Ursprungsmodul"
                                        name={[field.name, 'originModule']}
                                        labelCol={{span: 24}} wrapperCol={{span: 24}}
                                        rules={[{
                                            required: true,
                                            message: "Bitte den Namen des ursprünglichen Moduls angeben"
                                        }]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={1}>
                                    <Form.Item
                                        label="ECTS"
                                        name={[field.name, 'originEcts']}
                                        labelCol={{span: 24}} wrapperCol={{span: 24}}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Bitte die ECTS des ursprünglichen Moduls angeben"
                                            },
                                            {
                                                pattern: new RegExp(/^[0-9]{1,2}(,[0-9])?$/),
                                                message: "Bitte die ECTS des ursprünglichen Moduls im 'XX,X' oder 'X,X' Format angeben"
                                            }
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={1}>
                                    <Form.Item
                                        label="Note"
                                        name={[field.name, 'originGrade']}
                                        labelCol={{span: 24}} wrapperCol={{span: 24}}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Bitte die Note des ursprünglichen Moduls angeben"
                                            },
                                            {
                                                pattern: new RegExp(/^[0-9]{1,2}(,[0-9])?$/),
                                                message: "Bitte die Note des ursprünglichen Moduls im 'XX,X' oder 'X,X' Format angeben"
                                            }
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                {props.mode === 'enterEquivalence' &&
                                    <Col span={2}>
                                        <Form.Item
                                            label="Anerkannte Note"
                                            name={[field.name, 'originAckGrade']}
                                            labelCol={{span: 24}} wrapperCol={{span: 24}}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Bitte die anerkannte Note des ursprünglichen Moduls angeben"
                                                },
                                                {
                                                    pattern: new RegExp(/^(bestanden|abgelehnt|[0-9]{1,2}(,[0-9])?)$/),
                                                    message: "Bitte die anerkannte Note des ursprünglichen Moduls im 'XX,X'/'X,X' oder 'bestanden'/'abgelehnt' Format angeben"
                                                }
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                }
                            </Row>
                        ))}
                    </>
                )
            }}
        </Form.List>;
    }

    return (
        <Row>
            <Col span={24} style={{backgroundColor: '#6ec5ff', height: '70vh', overflow: "auto"}}>
                <Row justify={"center"}>
                    <Col>
                        <h2>Erfasste Daten</h2>
                    </Col>
                </Row>
                <Form initialValues={{
                    requestedCourse: initialFormData.requestedCourse,
                    originUniversity: initialFormData.originUniversity,
                    originCourse: initialFormData.originCourse,
                }} onFinish={submitFormHandler} onReset={onResetFormHandler}>
                    <Row justify="space-around">
                        <Col span={3}>
                            <Form.Item
                                label="Angefragter Studiengang" labelCol={{span: 24}} wrapperCol={{span: 24}}
                                name={"requestedCourse"}
                                rules={[{
                                    required: true,
                                    message: "Bitte den angefragten Studiengang der Fachhochschule-Dortmund angeben"
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                label="Ursprungshochschule" labelCol={{span: 24}} wrapperCol={{span: 24}}
                                name={"originUniversity"}
                                rules={[{
                                    required: true,
                                    message: "Bitte die ursprüngliche Hochschule des Studierenden eintragen"
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Ursprungsstudiengang" labelCol={{span: 24}} wrapperCol={{span: 24}}
                                name={"originCourse"}
                                rules={[{
                                    required: true,
                                    message: "Bitte den Studiengang angeben, der ursprünglich besucht wurde"
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider plain>Pflichtmodule</Divider>
                    {getModuleFormList(initialFormData.regularModules, "regularModules")}
                    <Divider plain>Wahlpflichtmodule</Divider>
                    {getModuleFormList(initialFormData.electiveModules, "electiveModules")}
                    <Row justify={"center"}>
                        <Col span={6}>
                            <Button type={"primary"} htmlType={"submit"}>Speichern</Button>
                        </Col>
                        <Col span={6}>
                            <Button type={"primary"} htmlType={"reset"}>Zurücksetzen</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}

export default BaCorrection;
