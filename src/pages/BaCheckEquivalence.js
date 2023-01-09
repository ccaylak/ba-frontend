import React from 'react';

import {FormOutlined, SendOutlined, UnorderedListOutlined, UploadOutlined} from "@ant-design/icons";

import BaStepper from "../components/BaStepper";
import BaUploadDocs from "../components/stepper-elements/BaUploadDocs";
import BaCorrection from "../components/stepper-elements/BaCorrection";
import BaEquivalence from "../components/stepper-elements/BaEquivalence";
import BaConclusionEquivalence from "../components/stepper-elements/BaConclusionEquivalence";

const steps = [
    {
        title: 'Hochladen',
        icon: <UploadOutlined/>,
        component: <BaUploadDocs
            description={
                "Hier können Sie Anerkennungsformulare hochladen und auf Äquivalenzen überprüfen lassen. " +
                "Demnach wird in diesem Kontext überprüft, ob die Module des Studiengangs der fremden " +
                "Hochschule schon ein mal für einen Studiengang der FH-Dortmund anerkannt und als äquivalent gekennzeichnet worden sind."
            }/>,
    },
    {
        title: 'Korrektur',
        icon: <FormOutlined/>,
        component: <BaCorrection/>
    },
    {
        title: 'Äquivalenzprüfung',
        icon: <UnorderedListOutlined/>,
        component: <BaEquivalence type={"checkEquivalence"}/>
    },
    {
        title: 'Abschluss',
        icon: <SendOutlined/>,
        component: <BaConclusionEquivalence />
    }
];

function BaCheckEquivalence() {
    return (
        <React.Fragment>
            <BaStepper steps={steps}></BaStepper>
        </React.Fragment>
    );
}

export default BaCheckEquivalence;
