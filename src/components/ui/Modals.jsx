/**
 * Created by hao.cheng on 2017/4/23.
 */
import React, { Component } from 'react';
import { Row, Col, Card, Modal, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';

class Modals extends Component {
    state = {
        ModalText2: 'Content of the modal dialog',
        visible2: false,
        loading3: false,
        visible3: false,
        modal1Visible: false,
    };
    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };
    handleOk2 = () => {
        this.setState({
            ModalText2: 'The modal dialog will be closed after two seconds',
            confirmLoading2: true,
        });
        setTimeout(() => {
            this.setState({
                visible2: false,
                confirmLoading2: false,
            });
        }, 2000);
    };
    setModal1Visible = (modal1Visible) => {
        this.setState({ modal1Visible });
    };
    // ES6对象的扩展  属性简洁表示法
    // es6 写法？？？
    handleCancel2 = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible2: false,
        });
    };
    showModal3 = () => {
        this.setState({
            visible3: true,
        });
    };
    handleOk3 = () => {
        this.setState({ loading3: true });
        setTimeout(() => {
            this.setState({ loading3: false, visible3: false });
        }, 3000);
    };
    handleCancel3 = () => {
        this.setState({ visible3: false });
    };
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="UI" second="对话框" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <p>
                                    <Button type="primary" onClick={this.showModal2}>异步关闭</Button>
                                    <Modal title="Title of the modal dialog"
                                           visible={this.state.visible2}
                                           onOk={this.handleOk2}
                                           confirmLoading={this.state.confirmLoading2}
                                           onCancel={this.handleCancel2}
                                    >
                                        <p>{this.state.ModalText2}</p>
                                    </Modal>
                                </p>
                                <p>
                                    <Button type="primary" onClick={this.showModal3}>
                                        自定义页脚
                                    </Button>
                                    <Modal
                                        visible={this.state.visible3}
                                        title="Title"
                                        onOk={this.handleOk3}
                                        onCancel={this.handleCancel3}
                                        footer={[
                                            <Button key="back" size="large" onClick={this.handleCancel3}>Return</Button>,
                                            <Button key="submit" type="primary" size="large" loading={this.state.loading3} onClick={this.handleOk3}>
                                                Submit
                                            </Button>,
                                        ]}
                                    >
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Modal>
                                </p>
                                <p>
                                    <Button type="primary" onClick={() => this.setModal1Visible(true)}>距离顶部20px</Button>
                                    <Modal
                                        title="20px to Top"
                                        style={{ top: 20 }}
                                        visible={this.state.modal1Visible}
                                        onOk={() => this.setModal1Visible(false)}
                                        onCancel={() => this.setModal1Visible(false)}
                                    >
                                        <p>some contents...</p>
                                        <p>some contents...</p>
                                        <p>some contents...</p>
                                    </Modal>
                                </p>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default Modals;