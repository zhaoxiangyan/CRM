import React, { Component } from 'react';
import { Row, Col, Card, Button, notification, Select } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const { Option } = Select;
class Notifications extends Component {
    openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
        });
    };
    openNotification3 = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm
            </Button>
        );
        notification.open({
            message: 'Notification Title',
            description: 'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            key,
            // ES6对象的扩展  属性简洁表示法
            onClose: this.close,
        });
    };
    close = () => {
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
    };

    render() {
        const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="通知提醒框" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.openNotification}>基本用法-4.5秒关闭</Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Button type="primary" onClick={this.openNotification3}>自定义按钮</Button>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Select
                                    defaultValue="topRight"
                                    style={{ width: 120, marginRight: 10 }}
                                    onChange={(val) => {
                                        notification.config({
                                            placement: val,
                                        });
                                    }}
                                >
                                    {options.map(val => <Option key={val} value={val}>{val}</Option>)}
                                </Select>
                                <Button
                                    type="primary"
                                    onClick={this.openNotification}
                                >
                                    打开消息通知
                                </Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Notifications;