import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllComponents from '../components';
import routesConfig from './config_CN';
// import {connect} from 'react-redux';

class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    requireLogin = (component, permission) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        if (process.env.NODE_ENV === 'production' && !permissions) { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return permission ? this.requireAuth(permission, component) : component;
    };
    reLogin = (component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        if (process.env.NODE_ENV === 'production' && !permissions) { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        return component;
    }
    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key => 
                        routesConfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        component={Component}
                                    />
                                )   
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}

/* component={props => r.login ? <Component {...props} /> : this.requireLogin(<Component {...props} />, r.auth)} */
// 如果需要替换插入line:35


/* <Route
    key={r.route || r.key}
    exact
    path={r.route || r.key}
    component={!r.auth ? props=>this.reLogin(<Component/>) : props=>this.requireLogin(<Component {...props} />, r.auth)}
/> */
/* 用户权限设置,会导致子组件重复渲染，未找到原因 */
/* return (
    r.auth?<Route
        key={r.route || r.key}
        exact
        path={r.route || r.key}
        component={props=>this.requireLogin(<Component {...props} />,r.auth)}
    />:
    <Route
        key={r.route || r.key}
        exact
        path={r.route || r.key}
        component={Component}
    />
) */
// line:47


// const mapStateToProps = state => {
//     const { auth = {data: {}} } = state.httpData;
//     return {auth};
// };
// export default connect(mapStateToProps)(CRouter);
export default CRouter;