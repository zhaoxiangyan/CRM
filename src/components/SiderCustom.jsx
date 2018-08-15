/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import routesCN from '../routes/config_CN';
import routesTW from '../routes/config_TW';
import routesUS from '../routes/config_US';
import SiderMenu from './SiderMenu';
// import logo from '../assets/img/logo.png';

const { Sider } = Layout;

class SiderCustom extends Component {
    static getDerivedStateFromProps (props, state) { 
        if (props.collapsed !== state.collapsed) {
            const state1 = SiderCustom.setMenuOpen(props);
            const state2 = SiderCustom.onCollapse(props.collapsed);
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed,  // 两个不等时赋值props属性值否则为false
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            }
        }
        return null;
    }
    static setMenuOpen = props => {
        const { pathname } = props.location;
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        };
    };
    static onCollapse = (collapsed) => {
        console.log(collapsed);
        return {
            collapsed,
            // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
    componentDidMount() {
        // this.setMenuOpen(this.props);
        const state = SiderCustom.setMenuOpen(this.props);
        this.setState(state);
        console.log('SiderCustom');
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     this.onCollapse(nextProps.collapsed);
    //     this.setMenuOpen(nextProps)
    // }
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        console.log(this.state);
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        const {lang} = this.props;
        let routes;
        switch (lang){
            case 'zh_CN': routes = routesCN;break;
            case 'zh_TW': routes = routesTW;break;
            case 'en_US': routes = routesUS;break;
            default: routes = routesUS;
        }
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo">
                    {/* <img src={logo} /> */}
                </div>
                <SiderMenu
                    menus={routes.menus}
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    const { lang = {data: {}} } = state.httpData;
    return {lang};
};

export default withRouter(connect(mapStateToProps)(SiderCustom));