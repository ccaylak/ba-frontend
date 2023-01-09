import BaStepper from "../components/BaStepper";
import {FormOutlined, SendOutlined, UploadOutlined} from "@ant-design/icons";
import BaUploadDocs from "../components/stepper-elements/BaUploadDocs";
import BaCorrection from "../components/stepper-elements/BaCorrection";
import BaEquivalence from "../components/stepper-elements/BaEquivalence";

const steps = [
    {
        title: 'Hochladen',
        icon: <UploadOutlined/>,
        component: <BaUploadDocs
            description={"In dieser Ansicht kannst du bereits abgeschlossene Anerkennungsdokumente hochladen, wodurch das Expertensystem an Wissen gewinnt. " +
                "Die Dokumente müssen einzeln im PDF-Format abgearbeitet werden"}/>,

    },
    {
        title: 'Korrektur',
        icon: <FormOutlined/>,
        component: <BaCorrection/>
    },
    {
        title: 'Abschluss',
        icon: <SendOutlined/>,
        component: <BaEquivalence type={'enterEquivalence'}/>
    }
];

function BaEnterEquivalence() {
    return (
        <>
            <BaStepper steps={steps}></BaStepper>
        </>
    );
}

export default BaEnterEquivalence;
