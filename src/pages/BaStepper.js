import {useEffect, useState} from 'react';
import {Button, Col, Row, Steps} from "antd";

import {
    FormOutlined,
    LeftOutlined,
    RightOutlined,
    SendOutlined,
    UnorderedListOutlined,
    UploadOutlined
} from "@ant-design/icons";

import BaUploadDocs from "../components/stepper-elements/BaUploadDocs";
import BaCorrection from "../components/stepper-elements/BaCorrection";
import BaEquivalence from "../components/stepper-elements/BaEquivalence";
import './BaStepper.css'

const BaStepper = (props) => {

    const [fileName, setFileName] = useState();
    const [formData, setFormData] = useState();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setFileName(undefined);
        setFormData(undefined);
        }, []);


    const uploadPDFHandler = (pdfName) => {
        setFileName(pdfName)
        console.log("Das PDF-Dokument: '%s' wurde erfolgreich hochgeladen", pdfName);
    }

    const submitFormHandler = (formData) => {
        setFormData(formData);
        console.log("Die folgenden Module wurden übermittelt: %O", formData);
    };

    const enterEquivalenceSteps = [
        {
            title: 'Hochladen',
            icon: <UploadOutlined/>,
            component: <BaUploadDocs
                onUploadPDF={uploadPDFHandler}
                description={"In dieser Ansicht kannst du bereits abgeschlossene Anerkennungsdokumente hochladen, wodurch das Expertensystem an Wissen gewinnt. " +
                    "Die Dokumente müssen einzeln im PDF-Format abgearbeitet werden"}
            />,

        },
        {
            title: 'Korrektur',
            icon: <FormOutlined/>,
            component: <BaCorrection
                mode='enterEquivalence'
                fileName={fileName}
                onSubmitForm={submitFormHandler}
            />
        },
        {
            title: 'Abschluss',
            icon: <SendOutlined/>,
            component: <BaEquivalence
                mode='enterEquivalence'
                data={formData}
            />
        }
    ];

    const checkEquivalenceSteps = [
        {
            title: 'Hochladen',
            icon: <UploadOutlined/>,
            component: <BaUploadDocs
                onUploadPDF={uploadPDFHandler}
                description={
                    "Hier können Sie Anerkennungsformulare hochladen und auf Äquivalenzen überprüfen lassen. " +
                    "Demnach wird in diesem Kontext überprüft, ob die Module des Studiengangs der fremden " +
                    "Hochschule schon ein mal für einen Studiengang der FH-Dortmund anerkannt und als äquivalent gekennzeichnet worden sind."
                }/>,
        },
        {
            title: 'Korrektur',
            icon: <FormOutlined/>,
            component: <BaCorrection
                mode='checkEquivalence'
                fileName={fileName}
                onSubmitForm={submitFormHandler}
            />
        },
        {
            title: 'Äquivalenzprüfung',
            icon: <UnorderedListOutlined/>,
            component: <BaEquivalence
                mode='checkEquivalence'
                data={formData}
            />
        }
    ];

    const getStepType = () => {
        if (props.mode === 'enterEquivalence') {
            return enterEquivalenceSteps;
        } else if (props.mode === 'checkEquivalence') {
            return checkEquivalenceSteps;
        }
    }

    return (
        <Row className="stepper" justify={"center"} style={{borderRadius: 6}}>
            <Col span={24}>
                <Steps className="stepper-header" items={getStepType()} current={currentStep}/>
                <div className="stepper-content">{getStepType()[currentStep].component}</div>
                <div>
                    {currentStep !== 0 &&
                        <Button
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(currentStep - 1)}
                            type={"primary"}
                            style={{float: "left"}}
                            icon={<LeftOutlined/>}
                            size={"large"}
                        >Zurück
                        </Button>
                    }
                    {
                        currentStep !== 2 &&
                        <Button
                            disabled={(currentStep === 0 && !fileName) || (currentStep === 1 && !formData) || currentStep === 2}
                            onClick={() => setCurrentStep(currentStep + 1)}
                            type={"primary"}
                            size={"large"}
                            style={{float: "right"}}
                            icon={<RightOutlined/>}
                        >Weiter</Button>
                    }
                </div>
            </Col>
        </Row>
    );
}

export default BaStepper;
