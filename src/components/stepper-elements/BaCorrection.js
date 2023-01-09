import {Col, Row, Spin} from "antd";

import BaLeftSide from "./BaLeftSide";
import BaRightSide from "./BaRightSide";

import universityExample from "../../assets/universityExample.png";
import courseExample from "../../assets/courseExample.png";
import moduleExample from "../../assets/moduleExample.png";
import axios from 'axios';
import {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";

const pictures = {
    university: universityExample,
    course: courseExample,
    modules: [
        {
            label: moduleExample,
        },
        {
            label: moduleExample,
        },
        {
            label: moduleExample,
        },
        {
            label: moduleExample,
        },
        {
            label: moduleExample,
        },
    ]
};

function BaCorrection(props) {

    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/ocr/acknowledgment/" + localStorage.getItem('fileName'))
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <Row justify={"space-around"} align={"middle"} style={{height: '70vh'}}>
                <Col span={24}>
                    <Spin tip={"Daten werden geladen..."} size="large" style={{color: "white"}}
                          indicator={<LoadingOutlined style={{fontSize: 100}} spin/>}/>
                </Col>
            </Row>
        );
    }

    return (
        <>
            <Row>
                <Col span={12} style={{backgroundColor: '#0068bf', height: '70vh', overflow: "auto"}}>
                    <BaLeftSide
                        title={localStorage.getItem('fileName')}
                        university={pictures.university}
                        course={pictures.course}
                        modules={pictures.modules}
                    />
                </Col>
                <Col span={12} style={{backgroundColor: '#6ec5ff', height: '70vh', overflow: "auto"}}>
                    <BaRightSide
                        title="Erfasste Daten"
                        requestedCourse={posts.requestData.requestedCourse}
                        originUniversity={posts.requestData.originUniversity}
                        originCourse={posts.requestData.originCourse}
                        regularModules={posts.regularModules}
                        electiveModules={posts.electiveModules}
                    />
                </Col>
            </Row>
        </>
    );
}

export default BaCorrection;
