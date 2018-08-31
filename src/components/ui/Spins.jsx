import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class Spins extends React.Component {
    nprogressStart = () => {
        NProgress.start();
    };
    nprogressDone = () => {
        NProgress.done();
    };
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="加载中" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <h4>顶部进度条</h4>
                                <p>
                                    <Button icon="caret-right" onClick={this.nprogressStart} />
                                    <span> NProgress.start() — 显示进度条</span>
                                </p>
                                <p style={{marginTop: 20}}>
                                    <Button icon="caret-right" onClick={this.nprogressDone} />
                                    <span>  NProgress.done() — 进度条完成</span>
                                </p>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Spins;