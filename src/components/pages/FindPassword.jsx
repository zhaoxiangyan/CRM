import React from 'react';
import { Form, Icon, Input, Button, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { langData } from '@/action';
import {FormattedMessage} from 'react-intl';

const FormItem = Form.Item;

class FindPassword extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    // 国际化
    langClick = e => {
        localStorage.setItem('lang', e.key);
        const {langData} = this.props;
        langData(e.key);
        window.location.reload();
    };
    render() {
        const { lang } = this.props;
        const { getFieldDecorator } = this.props.form;
        const menu = (
            <Menu onClick={this.langClick}>
                {lang !== 'zh_CN' && <Menu.Item key="zh_CN">简体中文</Menu.Item>}
                {lang !== 'en_US' && <Menu.Item key="en_US">English</Menu.Item>}
                {lang !== 'zh_TW' && <Menu.Item key="zh_TW">繁体中文</Menu.Item>}
            </Menu>
        )
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span><img src={require('../../assets/img/logo.png')} alt="gqfx" /></span>
                        <Dropdown overlay={menu}>
                            <Button size="small"><FormattedMessage id="title" /><Icon type="down" /></Button>
                        </Dropdown>          
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入邮箱地址!' }],
                            })(
                                <Input placeholder="请输入邮箱地址" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                发送验证邮件
                            </Button>
                            <span><Button className="login-form-button" style={{width: '100%'}} href="/login">
                                想起密码？直接登录
                            </Button></span>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const { lang = {data: {}} } = state.httpData;
    return { lang };
};
const mapDispatchToProps = dispatch => ({
    langData: bindActionCreators(langData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(FindPassword));