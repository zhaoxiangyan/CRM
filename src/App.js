import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { tokenAction,phone_codeAction,responsiveAction } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import Code from './locale/phone_Code';
import axios from 'axios';


const { Content, Footer } = Layout;


class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        const { tokenAction,phone_codeAction } = this.props;
        if(localStorage.getItem('user')){
            axios.defaults.headers['Authorization']='Bearer '+JSON.parse(localStorage.getItem('user')).access_token;
        }else{
            this.props.history.push('/login');
        }
        const user = JSON.parse(localStorage.getItem('user'));
        const lang = localStorage.getItem('lang');
        user && tokenAction(user);
        // 获取手机区号 并储存进store
        console.log(Code);
        phone_codeAction(Code,lang);
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
            // console.log(document.body.clientWidth);
        }
    }
    componentDidMount() {
        const openNotification = () => {
            notification.open({
              message: 'Welcome',
              description: (
                  <div>
                      <p>官网地址： <a href="https://www.gqfxcn.com" target="_blank" rel="noopener noreferrer">www.gqfxcn.com</a></p>
                      <p>CRM地址：<a href="https://www.crm.gqfxcn.com" target="_blank" rel="noopener noreferrer" >www.crm.gqfxcn.com</a></p>
                  </div>
              ),
              icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
              duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }
    // shouldComponentUpdate(){
    //     return (this.props.history.action === 'POP')
    // }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { responsiveAction } = this.props;
        // 解构  destructuring  ES6语法
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        responsiveAction({isMobile: clientWidth <= 992});
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { token, responsive } = this.props;
        return (
            <Layout>
                {!responsive.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={token || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes auth={token} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    React-Admin ©{new Date().getFullYear()} Created by gqfxcn@qq.com
                    </Footer>
                </Layout>
                
                {/* {
                    responsive.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                } */}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { token } = state.serverData;
    const {responsive} = state.clientData;
    return {token, responsive};
};
const mapDispatchToProps = dispatch => ({
    tokenAction: bindActionCreators(tokenAction, dispatch),
    phone_codeAction:bindActionCreators(phone_codeAction,dispatch),
    responsiveAction:bindActionCreators(responsiveAction,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
