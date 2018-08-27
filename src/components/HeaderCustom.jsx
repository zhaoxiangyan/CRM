import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge, Popover } from 'antd';
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';
// import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {FormattedMessage} from 'react-intl';
import { bindActionCreators } from 'redux';
import { langData } from '@/action';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;


class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        full:false
    };
    componentDidMount() {
        axios.get('/static/api/country_code.json').then((res)=>{
            console.log("res:",res);
        }).catch((err)=>{
            console.log("err:",err);
        })
        // 外部接口proxy
        const QueryString = queryString();
        // if (QueryString.hasOwnProperty('code')) {
        //     console.log(QueryString);
        //     const _user = JSON.parse(localStorage.getItem('user'));
        //     !_user && gitOauthToken(QueryString.code).then(res => {
        //         console.log(res);
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        //     _user && this.setState({
        //         user: _user
        //     });
        // }
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
        this.setState({full:!this.state.full})
    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
        // 在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。
        // 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
        e.key === 'zh_cn' && this.clickCN();
        e.key === 'zh_tw' && this.clickTW();
        e.key === 'en_us' && this.clickUS();
    };
    clickCN = () =>{
        localStorage.setItem('lang', 'zh_CN');
        const {langData} = this.props;
        langData('zh_CN');
        window.location.reload();
    };
    clickTW = () =>{
        localStorage.setItem('lang', 'zh_TW');
        const {langData} = this.props;
        langData('zh_TW');
        window.location.reload();
    };
    clickUS = () =>{
        localStorage.setItem('lang', 'en_US');
        const {langData} = this.props;
        langData('en_US');
        window.location.reload();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    render() {
        const { responsive,lang } = this.props;
        // 删除path
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <SubMenu title={<FormattedMessage id="title" tagName="b" />}>
                            {lang !== 'zh_CN' && <Menu.Item key="zh_cn">简体中文</Menu.Item>}
                            {lang !== 'en_US' && <Menu.Item key="en_us">English</Menu.Item>}
                            {lang !== 'zh_TW' && <Menu.Item key="zh_tw">繁体中文</Menu.Item>}
                    </SubMenu>
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type={this.state.full?'shrink':'arrows-alt'} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<Icon type="setting" />}>
                        <Menu.Item key="setting:1">消息设置</Menu.Item>
                        <Menu.Item key="setting:2">操作日志</Menu.Item>
                        <Menu.Item key="setting:3">用户管理</Menu.Item>
                        <Menu.Item key="setting:4">账户设置</Menu.Item>
                        <Menu.Item key="setting:5">返佣管理</Menu.Item>
                        <Menu.Item key="setting:6">搜索模板设置</Menu.Item>
                        <Menu.Item key="setting:7">出入金统计设置</Menu.Item>
                        <Menu.Item key="setting:8">通知中心</Menu.Item>
                    </SubMenu>
                    <SubMenu title={<span className="avatar"><img src={require('../style/imgs/b1.jpg')} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <Menu.Item key="user:1">你好 - {this.props.user.userName}</Menu.Item>
                        <Menu.Item key="user:2">出金申请</Menu.Item>
                        <Menu.Item key="user:3">修改密码</Menu.Item>
                        <Menu.Item key="user:4">个人资料</Menu.Item>
                        <Menu.Item key="user:5">推广链接</Menu.Item>
                        <Menu.Item key="user:6">邮箱设置</Menu.Item>
                        <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                    </SubMenu>
                </Menu>
                {/* <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style> */}
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = {data: {}} } = state.httpData;
    return {responsive};
};
const mapDispatchToProps = dispatch => ({
    langData: bindActionCreators(langData, dispatch)
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderCustom));
