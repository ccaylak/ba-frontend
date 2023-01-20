import './BaUploadDocs.css';

import {Col, Row} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";

function BaUploadDocs(props) {

    const uploadProps = {
        name: 'file',
        action: 'http://localhost:8080/upload',
        accept: '.pdf',
        maxCount: 1,
        onChange(info) {
            const {status} = info.file;
            if (status === 'done') {
                props.onUploadPDF(info.file.response);
            }
        },
    };

    return (
        <>
            <Row justify={"center"} align={"middle"}>
                <div style={{width: "70%", padding: "0 100px"}}>
                    <Row justify={"center"} align={"middle"} style={{padding: "100px 0"}}>
                        <Col>
                            {props.description}
                        </Col>
                    </Row>
                    <Dragger listType={"picture-card"}
                             {...uploadProps}>
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
