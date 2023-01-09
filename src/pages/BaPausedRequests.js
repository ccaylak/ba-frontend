import {Space, Table} from "antd";


const columns = [
    {
        title: 'Angefragter Studiengang',
        dataIndex: 'requested_course',
        key: 'requested_course',
    },
    {
        title: 'Ursprungs Studiengang',
        dataIndex: 'source_course',
        key: 'source_course',
    },
    {
        title: 'Aktionen',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>fortfahren</a>
                <a>löschen</a>
            </Space>
        )
    }
];

const dataSource = [
    {
        key: '1',
        requested_course: 'Fachhochschule Dortmund: Informatik',
        source_course: 'IT-Center Dortmund: Bachelor- und IT-Systeme',
    },
    {
        key: '2',
        requested_course: 'Fachhochschule Dortmund: Wirtschaftsinformatik',
        source_course: 'Ruhruniversität Bochum: Informatik',
    },
];

function BaPausedRequests() {
    return (
        <Table dataSource={dataSource} columns={columns}/>
    );
}

export default BaPausedRequests;