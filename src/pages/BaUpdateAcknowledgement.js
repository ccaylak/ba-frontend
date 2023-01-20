import React, {useEffect, useState} from "react";
import {Button, Col, Input, List, Row} from "antd";

const BaUpdateAcknowledgement = () => {

    const [missingModules, setMissingModules] = useState();
    const [grade, setGrade] = useState();

    useEffect(() => {
        const fetchMissingModules = async () => {
            const response = await fetch("http://localhost:8080/update/all");
            const responseJson = await response.json();

            setMissingModules(responseJson)
        };

        fetchMissingModules().catch();
    }, []);

    const updateModule = async (module) => {
        const ackGrade = grade;
        return await fetch("http://localhost:8080/update/module", {
            method: 'POST',
            body: JSON.stringify({
                requestedModuleId: module.requestedModuleId,
                originModule: module.originModule,
                originEcts: module.originEcts,
                originGrade: module.originGrade,
                originAckGrade: ackGrade
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    };
    const submitUpdatedModule = (module) => {
        updateModule(module).catch(error => console.log(error));
    }

    const changeHandler = (e) => {
        setGrade(e.target.value);
    };

    return (
        <List
            bordered
            dataSource={missingModules}
            renderItem={(module) => (
                <Row justify={"space-around"}>
                    <Col>
                        <List.Item>
                            {module.requestedModuleId}: {module.requestedModule} - {module.requestedEcts}; {module.originModule}: {module.originEcts} - {module.originGrade}
                        </List.Item>
                    </Col>
                    <Col>
                        <Input onChange={changeHandler}/>
                    </Col>
                    <Col>
                        <Button onClick={() => submitUpdatedModule(module)}>Note aktualisieren</Button>
                    </Col>
                </Row>
            )}
        />
    );
};

export default BaUpdateAcknowledgement;