import {Button, Col, Form, Input, InputNumber, List, Modal, Row} from "antd";
import {DeleteOutlined, PlusCircleFilled} from "@ant-design/icons";
import {useState} from "react";

const moduleList = [
    {
        label: 'Programmieren',
        ects: 5.0

    },
    {
        label: 'Mathematik',
        ects: 2.5

    },
    {
        label: 'Rechnerstrukturen',
        ects: 1.0
    },
    {
        label: 'Programmieren',
        ects: 10.0
    },
    {
        label: 'Mathematik',
        ects: 2.0
    },
    {
        label: 'Rechnerstrukturen',
        ects: 5.0
    },
    {
        label: 'Programmieren',
        ects: 5.0
    },
    {
        label: 'Mathematik',
        ects: 5.0
    },
    {
        label: 'Rechnerstrukturen',
        ects: 5.0
    },
];

const CollectionCreateForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Neues Modul hinzufügen"
            okText="Modul hinzufügen"
            cancelText="Verwerfen"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="label"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie einen Namen für das neue Modul an',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="ects"
                    label="ECTS"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte geben Sie die ECTS für das neue Modul an',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

function BaEditList(props) {
    const [open, setOpen] = useState(false);

    const [modules, setModules] = useState(moduleList);

    const onCreate = (values) => {
        let module = {
            label: values.label,
            ects: values.ects
        };

        const copy = modules;
        modules.push(module);

        setModules(copy);

        console.log('Received values of form: ', values);
        setOpen(false);
    };

    return (
        <>
            <Row justify="center">
                <Col span={15}>
                    <List
                        grid={{column: 2}}
                        itemLayout="horizontal"
                        dataSource={modules}
                        renderItem={(module) => (
                            <List.Item>
                                <Row justify="space-evenly">
                                    <Col span={10}>
                                        <h5>Name</h5>
                                        <Input value={module.label}/>
                                    </Col>
                                    <Col span={4}>
                                        <h5>ECTS</h5>
                                        <InputNumber value={module.ects}/>
                                    </Col>
                                    <Col span={2}>
                                        <h5>Aktionen</h5>
                                        <Button type="primary" shape="circle" icon={<DeleteOutlined/>}/>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    >
                    </List>
                </Col>
            </Row>
            <Row justify="space-around">
                <Col span={14}>
                    <Button type="primary" onClick={() => {
                        setOpen(true);
                    }} icon={<PlusCircleFilled/>} block>Studiengänge hinzufügen</Button>
                    <CollectionCreateForm
                        open={open}
                        onCreate={onCreate}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </Col>
            </Row>
        </>
    );
}

export default BaEditList;
