import {Button, Col, Modal, Row, Table} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const BaEquivalence = (props) => {

    const [acknowledgementData, setAcknowledgementData] = useState([]);
    const [open, setOpen] = useState(false);
    const [modal, contextHolder] = Modal.useModal();

    const navigate = useNavigate();

    useEffect(() => {

        const checkEquivalence = async () => {
            let response = await fetch("http://localhost:8080/check/acknowledgment/", {
                method: 'POST',
                body: JSON.stringify(props.data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const responseData = await response.json();

            const unknownResponseData = responseData.filter(entry => entry.originAckGrade === 'unbekannt');
            const knownResponseData = responseData.filter(entry => !(entry.originAckGrade === 'unbekannt'));

            if (unknownResponseData.length > 0) {
                setOpen(true);
            }

            modal.info({
                open: open,
                title: `${unknownResponseData.length} fehlende Äquivalenzen`,
                width: "auto",
                okText: "Okay!",
                content:
                    <>
                        <p>Für die nachfolgende Auflistung von Modulen wurden keine Äquivalenzen gefunden. Diese werden
                            also ToDos unter dem Reiter "Fortfahren" aufgeführt</p>
                        <Table
                            size={"small"}
                            dataSource={unknownResponseData}
                            pagination={false}
                        >
                            <ColumnGroup title={"Fachhochschule Dortmund"}>
                                <Column title="Modulnummer" dataIndex="requestedModuleId" key="requestedModuleId"/>
                                <Column title="Modul" dataIndex="requestedModule" key="requestedModule"/>
                                <Column title="ECTS" dataIndex="requestedEcts" key="requestedEcts"/>
                            </ColumnGroup>
                            <ColumnGroup title={"Fremde Hochschule"}>
                                <Column title="Modul" dataIndex="originModule" key="originModule"/>
                                <Column title="ECTS" dataIndex="originEcts" key="originEcts"/>
                                <Column title="Note" dataIndex="originGrade" key="originGrade"/>
                                <>
                                    {props.mode === 'enterEquivalence' &&
                                        <Column title="Anerkannte Note" dataIndex="originAckGrade"
                                                key="originAckGrade"/>
                                    }
                                </>
                                <>
                                    {props.mode === 'checkEquivalence' &&
                                        <Column title="Entscheidung" dataIndex="originAckGrade" key="originAckGrade"/>
                                    }
                                </>
                            </ColumnGroup>
                        </Table>
                    </>
                ,
                centered: true,
                onOk() {
                    setOpen(false);
                    fetch("http://localhost:8080/save/acknowledgment/", {
                        method: 'POST',
                        body: JSON.stringify({
                            originUniversity: props.data.originUniversity,
                            originCourse: props.data.originCourse,
                            requestedCourse: props.data.requestedCourse,
                            regularModules: unknownResponseData,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then();
                }
            });

            setAcknowledgementData(knownResponseData);
        }

        if (props.mode === 'checkEquivalence') {
            checkEquivalence().catch();
        }
    }, []);

    const saveFormData = async () => {
        return await fetch("http://localhost:8080/save/acknowledgment/", {
            method: 'POST',
            body: JSON.stringify(props.data),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    const clickHandler = () => {
        saveFormData()
            .catch((error) => error.message);
    }

    const renderTable = (acknowledgementData) => {
        let dataSource = [];
        if (props.mode === 'enterEquivalence') {
            dataSource = [...props.data.electiveModules, ...props.data.regularModules];
        } else if (props.mode === 'checkEquivalence') {
            dataSource = [...acknowledgementData];
        }
        return (
            <Table
                dataSource={dataSource}
                pagination={false}
                bordered
                style={{marginTop: "1%", marginBottom: "1%"}}
            >
                <ColumnGroup title={`Fachhochschule Dortmund: ${props.data.requestedCourse}`}>
                    <Column title="Modulnummer" dataIndex="requestedModuleId" key="requestedModuleId"/>
                    <Column title="Modul" dataIndex="requestedModule" key="requestedModule"/>
                    <Column title="ECTS" dataIndex="requestedEcts" key="requestedEcts"/>
                </ColumnGroup>
                <ColumnGroup title={`${props.data.originUniversity}: ${props.data.originCourse}`}>
                    <Column title="Modul" dataIndex="originModule" key="originModule"/>
                    <Column title="ECTS" dataIndex="originEcts" key="originEcts"/>
                    <Column title="Note" dataIndex="originGrade" key="originGrade"/>
                    <>
                        {props.mode === 'enterEquivalence' &&
                            <Column title="Anerkannte Note" dataIndex="originAckGrade" key="originAckGrade"/>
                        }
                    </>
                    <>
                        {props.mode === 'checkEquivalence' &&
                            <Column title="Symbol" dataIndex="originAckGrade" key="originAckGrade"/>
                        }
                    </>
                </ColumnGroup>
            </Table>
        );
    }

    const showResetModal = () => {
        Modal.warning({
            title: "Willst du die aktuelle Anerkennung wirklich verwerfen?",
            okText: "Ja, verwerfen",
            cancelText: "Nein, nicht verwerfen",
            onOk() {
                navigate("/");
            },
        });
    };

    return (
        <Row justify={"center"} style={{overflowY: "scroll", height: '70vh'}}>
            <Col>
                {renderTable(acknowledgementData)}
                {contextHolder}
                {props.mode === 'enterEquivalence' &&
                    <Row>
                        <Col>
                            <Button type="primary" onClick={clickHandler} icon={<SaveOutlined/>}>
                                Speichern
                            </Button>
                        </Col>
                        <Col>
                            <Button type="danger" onClick={showResetModal} icon={<CloseOutlined/>}>
                                Verwerfen
                            </Button>
                        </Col>
                    </Row>
                }
            </Col>
        </Row>
    );
}

export default BaEquivalence;
