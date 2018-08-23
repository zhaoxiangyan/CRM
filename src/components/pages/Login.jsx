/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData, langData } from '@/action';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    // componentWillReceiveProps(nextProps) {
    //     const { auth: nextAuth = {} } = nextProps;
    //     const { history } = this.props;
    //     if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
    //         localStorage.setItem('user', JSON.stringify(nextAuth.data));
    //         history.push('/');
    //     }
    // }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) {   // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { fetchData } = this.props;
                if (values.userName === 'admin' && values.password === 'admin') fetchData({funcName: 'admin', stateName: 'auth'});
                if (values.userName === 'guest' && values.password === 'guest') fetchData({funcName: 'guest', stateName: 'auth'});
            }
        });
    };
    gitHub = () => {
        // window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
        console.log('第三方登录');
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
                        <span>Admin</span>
                        <Dropdown overlay={menu}>
                            <Button size="small"><FormattedMessage id="title" /><Icon type="down" /></Button>
                        </Dropdown>          
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <Link to="/findpassword" className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码？</Link>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href="">或 现在就去注册!</a>
                                <a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const { auth,lang = {data: {}} } = state.httpData;
    return { auth,lang };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
    langData: bindActionCreators(langData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));