import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { receiveData,langData,codeData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import Code from './locale/phone_Code';


const { Content, Footer } = Layout;


class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        const { receiveData,langData,codeData } = this.props;
        localStorage.getItem('user')||this.props.history.push('/login');
        const user = JSON.parse(localStorage.getItem('user'));
        const lang = localStorage.getItem('lang');
        user && receiveData(user, 'auth');
        lang && langData(lang);
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        // 获取手机区号 并储存进store
        console.log(Code);
        codeData(Code,lang);
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
              message: 'Andy',
              description: (
                  <div>
                      <p>GitHub地址： <a href="localhost" target="_blank" rel="noopener noreferrer">github</a></p>
                      <p>博客地址：<a href="localhost" target="_blank" rel="noopener noreferrer" >gitbu</a></p>
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
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        // 解构  destructuring  ES6语法
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        console.log(this.props.auth);
        // console.log(this.props.responsive);
        const { auth, responsive, lang } = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom lang={lang} toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes auth={auth} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    React-Admin ©{new Date().getFullYear()} Created by 987670346@qq.com
                    </Footer>
                </Layout>
                
                {/* {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
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
    const { auth = {data: {}}, responsive = {data: {}}, lang = {data: {}} } = state.httpData;
    return {auth, responsive, lang};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch),
    langData:bindActionCreators(langData,dispatch),
    codeData:bindActionCreators(codeData,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
