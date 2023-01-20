import {Card, Col, List, Row} from "antd";
import Search from "antd/es/input/Search";
import {useState} from "react";


function BaSearch() {

    const [searchResult, setSearchResult] = useState([]);

    const search = async (searchText) => {
        const response = await fetch("http://localhost:8080/search/" + searchText);
        const responseJson = await response.json();

        setSearchResult(responseJson);
    };

    const searchHandler = (searchText) => {
        search(searchText).catch(error => console.log(error));
    }

    return (
        <>
            <Row justify="center" align="middle">
                <Col span={5}>
                    <Search
                        placeholder="input search text"
                        enterButton
                        onSearch={searchHandler}
                    />
                </Col>
            </Row>
            <List
                grid={{
                    gutter: 16,
                    column: 4,
                }}
                dataSource={searchResult}
                renderItem={(module) => (
                    <List.Item>
                        <Card title={`${module.name} ${module.ects} ${module.grade} `}>Card content</Card>
                    </List.Item>
                )}
            />
        </>
    );
}

export default BaSearch;
