import './BaStepper.css';

import {useState} from "react";

import {Button, Col, Row, Steps} from 'antd';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

function BaStepper(props) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <>
            <Row className="stepper" justify={"center"} style={{borderRadius: 6}}>
                <Col span={24}>
                    <Steps className="stepper-header" items={props.steps} current={currentStep}>
                    </Steps>
                    <div className="stepper-content">{props.steps[currentStep].component}</div>
                    <div className="stepper-footer">
                        <Button
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(currentStep - 1)}
                            type={"primary"}
                            style={{float: "left"}}
                            icon={<LeftOutlined/>}
                            size={"large"}
                        >Zurück
                        </Button>
                        <Button
                            disabled={currentStep === props.steps.size}
                            onClick={() => setCurrentStep(currentStep + 1)}
                            type={"primary"}
                            size={"large"}
                            style={{float: "right"}}
                            icon={<RightOutlined/>}
                        >Weiter</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default BaStepper;
