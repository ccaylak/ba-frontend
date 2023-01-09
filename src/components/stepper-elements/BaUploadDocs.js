import './BaUploadDocs.css';

import {Col, notification, Row} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";

function BaUploadDocs(props) {

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, fileName) => {
        let messageContent = "";
        let descriptionContent = "";

        if (type === 'success') {
            messageContent = "Erfolgreich hochgeladen";
            descriptionContent = `${fileName} wurde dem Expertensystem übermittelt.`;
        }
        if (type === 'error') {
            messageContent = "Hochladen fehlgeschlagen";
            descriptionContent = `${fileName} konnte dem Expertensystem nicht übermittelt werden.`;
        }

        api[type]({
            message: messageContent,
            description: descriptionContent,
        });
    };

    const uploadProps = {
        name: 'file',
        action: 'http://localhost:8080/upload',
        accept: '.pdf',
        maxCount: 1,
        onChange(info) {
            const {status} = info.file;
            if (status !== 'uploading') {
                console.log(info.file.response);
            }
            if (status === 'done') {
                localStorage.setItem("fileName", info.file.response);
                openNotificationWithIcon('success', info.file.name);
            } else if (status === 'error') {
                openNotificationWithIcon('error', info.file.name);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            {contextHolder}
            <Row justify={"center"} align={"middle"}>
                <div style={{width: "50%", padding: "0 100px"}}>
                    <Row justify={"center"} align={"middle"} style={{padding: "100px 0"}}>
                        <Col>
                            {props.description}
                        </Col>
                    </Row>
                    <Dragger listType={"picture-card"} {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Klicke oder ziehe dein Dokument per Drag & Drop in das Feld zum
                            Hochladen</p>
                        <p className="ant-upload-hint">
                            Es kann nur maximal ein Dokument im PDF-Format hochgeladen werden.
                            Außerdem sollte das Dokument möglichst digital ausgefüllt und erstellt worden sein.
                        </p>
                    </Dragger>
                </div>
            </Row>
        </>
    );
}

export default BaUploadDocs;
