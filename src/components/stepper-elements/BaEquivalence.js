import {Button, Card, Col, Modal, Row, Table} from "antd";
import {CloseOutlined, ExclamationCircleFilled, SaveOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import axios from 'axios';
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import {useNavigate} from "react-router-dom";

const {confirm} = Modal;

function BaEquivalence(props) {

    const [acknowledgmentData, setAcknowledgmentData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setAcknowledgmentData(JSON.parse(localStorage.getItem('acknowledgmentData')))
    }, []);

    function saveData() {
        axios.post("http://localhost:8080/save/acknowledgment/", acknowledgmentData)
            .then(response => console.log("success"));
    }

    function renderTable(data, type) {
        if (data.regularModules !== undefined && data.electiveModules !== undefined) {
            if (type === 'enterEquivalence') {
                return (
                    <Table
                        style={{padding: "0 10%"}}
                        dataSource={[...data.electiveModules, ...data.regularModules]}
                        bordered
                        pagination={false}
                    >
                        <ColumnGroup title="Angefragte Daten">
                            <Column title="Modulnummer" dataIndex="requestedModuleId" key="requestedModuleId"/>
                            <Column title="Modul" dataIndex="requestedModule" key="requestedModule"/>
                            <Column title="ECTS" dataIndex="requestedEcts" key="requestedEcts"/>
                        </ColumnGroup>
                        <ColumnGroup title="Ursprungsdaten">
                            <Column title="Modul" dataIndex="originModule" key="originModule"/>
                            <Column title="ECTS" dataIndex="originEcts" key="originEcts"/>
                            <Column title="Note" dataIndex="originGrade" key="originGrade"/>
                            <Column title="Anerkannte Note" dataIndex="originAckGrade" key="originAckGrade"/>
                        </ColumnGroup>
                    </Table>
                );
            }
            if (type === 'checkEquivalence') {
                return (
                    <Table
                        style={{padding: "0 10%"}}
                        dataSource={[...data.electiveModules, ...data.regularModules]}
                        bordered
                        pagination={false}
                    >
                        <ColumnGroup title="Angefragte Daten">
                            <Column title="Modulnummer" dataIndex="requestedModuleId" key="requestedModuleId"/>
                            <Column title="Modul" dataIndex="requestedModule" key="requestedModule"/>
                            <Column title="ECTS" dataIndex="requestedEcts" key="requestedEcts"/>
                        </ColumnGroup>
                        <ColumnGroup title="Ursprungsdaten">
                            <Column title="Modul" dataIndex="originModule" key="originModule"/>
                            <Column title="ECTS" dataIndex="originEcts" key="originEcts"/>
                            <Column title="Note" dataIndex="originGrade" key="originGrade"/>
                            <Column title="Anerkannte Note" dataIndex="originAckGrade" key="originAckGrade"/>
                        </ColumnGroup>
                        <ColumnGroup title="Entscheidung">
                            <Column title={"Note"}>xD</Column>
                        </ColumnGroup>
                    </Table>
                );
            }
        }
    }

    const showConfirm = () => {
        confirm({
            title: 'Willst du die aktuelle Anerkennung wirklich verwerfen?',
            icon: <ExclamationCircleFilled/>,
            okText: 'Ja, verwerfen',
            cancelText: 'Nein, nicht verwerfen',
            onOk() {
                killLocalStorage();
            },
        });
    };

    function killLocalStorage() {
        localStorage.removeItem("fileName");
        localStorage.removeItem("acknowledgmentData");
        navigate("/");
    }

    function buttonRow(type) {
        if (type === 'enterEquivalence') {
            return (
                <>
                    <Row justify="space-around" align="middle" style={{paddingTop: "1%"}}>
                        <Col>
                            <Button type="primary" onClick={saveData} icon={<SaveOutlined/>}>
                                Speichern
                            </Button>
                        </Col>
                        <Col>
                            <Button type="danger" onClick={showConfirm} icon={<CloseOutlined/>}>
                                Verwerfen
                            </Button>
                        </Col>
                    </Row>
                </>
            );
        }
    }

    return (
        <>
            <Row justify="center" align="middle"
                 style={{height: '70vh', overflow: "auto"}}>
                <Col span={18}>
                    <Card title="Zusammenfassung der erfassten Daten">
                        <Card.Grid style={{width: '100%', textAlign: 'left'}} hoverable={false}>
                            <span
                                style={{float: "left"}}>Angefragter Studiengang: {acknowledgmentData.requestedCourse}</span>
                            <span
                                style={{float: "right"}}>Ursprungsuniversität: {acknowledgmentData.originUniversity}: {acknowledgmentData.originCourse}</span>
                        </Card.Grid>
                        {renderTable(acknowledgmentData, props.type)}
                    </Card>
                </Col>
            </Row>
            {buttonRow(props.type)}
        </>
    );
}

export default BaEquivalence;
