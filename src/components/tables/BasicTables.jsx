import React from 'react';
import { Row, Col, Card } from 'antd';
import SearchTable from './SearchTable';
import BreadcrumbCustom from '../BreadcrumbCustom';

const BasicTables = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="表格" second="基础表格" />
        <Row gutter={16}>
            {/*<Col className="gutter-row" span={10}>*/}
                {/*<div className="gutter-box">*/}
                    {/*<Card title="弹层表单" bordered={false}>*/}
                    {/*</Card>*/}
                {/*</div>*/}
            {/*</Col>*/}
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="自定义筛选" bordered={false}>
                        <SearchTable />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default BasicTables;