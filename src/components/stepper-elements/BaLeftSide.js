import React from "react";

import {Col, Divider, Image, Row} from "antd";

function renderModule(module, index) {
    return (
        <React.Fragment key={index}>
            <Row justify="center" align="middle">
                <Col>
                    <Image
                        src={module}
                        width={700}
                    />
                </Col>
            </Row>
            <Divider/>
        </React.Fragment>
    );
}

function BaLeftSide(props) {

    return (
        <>
            <Row justify="center" align="middle">
                <Col>
                    <h2>{props.title}</h2>
                </Col>
            </Row>
            <Divider />
            <Row justify="center" align="middle">
                <Col>
                    <Image
                        src={props.course}
                        width={200}
                    />
                </Col>
            </Row>
            <Divider/>
            <Row justify="center" align="middle">
                <Col>
                    <Image
                        src={props.university}
                        width={700}
                    />
                </Col>
            </Row>
            <Divider/>
            {props.modules.map((module, index) => renderModule(module.label, index))}
        </>
    );
}

export default BaLeftSide;
