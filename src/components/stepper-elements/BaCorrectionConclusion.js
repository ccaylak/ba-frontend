import {Button, Col, Row} from "antd";
import {DeleteOutlined, PauseCircleOutlined} from "@ant-design/icons";

const missingModules = ["Programmieren", "Englisch"];

function generateModuleText(modules) {
    if (modules.length === 1) {
        return (
            <p>Für das Modul {modules.at(0)} wurde keine Referenz für die Äquivalenzprüfung gefunden</p>
        );
    } else if (modules.length > 1) {
        return (
            <p>Für die Module: {modules.join(',')} wurden keine Referenzen für die Äquivalenzprüfung gefunden</p>
        )
    }

}

function getJo(modules) {
    if (modules.length === 1) {
        return 'den';
    } else if (modules.length > 1) {
        return 'die';
    }
}

function BaCorrectionConclusion() {
    return (
        <Row>
            <Col>
                {generateModuleText(missingModules)}

                <p>Bitte kontaktieren Sie {getJo(missingModules)} entsprechenden Modulverantwortlichen. Zusätzlich
                    sollten Sie einen Blick in Ihr E-Mail
                    Postfach werden,
                    denn dort könnten Referenzen auch gefunden werden.</p>
            </Col>
            <Col>
                <Row>
                </Row>
                <Row>
                    <Col>
                        <Button icon={<PauseCircleOutlined/>} size="large">Äquivalenz pausieren</Button>
                    </Col>
                    <Col>
                        <Button icon={<DeleteOutlined/>} size="large">Verwerfen</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BaCorrectionConclusion;