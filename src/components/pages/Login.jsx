/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Menu, Dropdown, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData, langData, authData } from '@/action';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import axios from 'axios';

const FormItem = Form.Item;

class Login extends React.Component {
    state = {
        error:'',
        errorstatus:true
    }
    componentWillMount() {
        localStorage.getItem('user')&&this.props.history.push('/app/dashboard/index');
    }
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
            console.log(values);
            if (!err) {
                console.log('Received values of form: ', values);
                    // 用户登录
                    axios({
                        method:'post',
                        url:'https://api.gqfxcn.com/passport/login',
                        data:values
                    }).then(res=>{
                        if(res.data.is_succ){
                            this.setState({errorstatus:res.data.is_succ});
                            authData(res.data.data);
                            localStorage.setItem('user', JSON.stringify(res.data.data));
                            this.props.history.push('/app/dashboard/index');
                        }else{
                            this.setState({error:res.data.message,errorstatus:res.data.is_succ});
                        }   
                    }).catch(err=>{
                        if(!err.response.data.is_succ){
                            this.setState({error:err.response.data.message,errorstatus:err.response.data.is_succ});
                        }
                    })
                // if (values.userName === 'guest' && values.password === 'guest') fetchData({funcName: 'guest', stateName: 'auth'});
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
                    {this.state.errorstatus||<Alert message={this.state.error} type="error" style={{marginBottom:15}} />}
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入邮箱!' }],
                                initialValue:'admin@qq.com'
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="邮箱" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                                initialValue:'123456'
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )} */}
                            <Checkbox>记住我</Checkbox>
                            <Link to="/findpassword" className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码？</Link>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
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
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
    langData: bindActionCreators(langData, dispatch),
    authData: bindActionCreators(authData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));