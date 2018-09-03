/**
 * http通用工具函数
 */
import axios from 'axios';
// import { message } from 'antd';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({url, data, msg = '接口异常', headers}) =>
    axios.get(url, data, headers).then(res =>{ 
        return res.data;
    }).catch(err => {
        return err.response.data;
    //    message.warn(msg);
    });

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, data, msg = '接口异常', headers}) =>
    axios.post(url, data, headers).then(res => {
        return res.data;
    }).catch(err => {
        return err.response.data;
        // message.warn(msg);
    });




/**
 * 所有api接口url
 */
export const CRM = {
    // jack
    // 客户列表
    getcustomerlists:'/api/customers',

    // james
    // 用户登录
    login:'/api/passport/login',
    // 用户退出登录
    logout:'/api/passport/logout',
    // 登录用户资料
    userinfo:'/api/userinfo',
    // Broker Work用户管理
    users:'/api/users',
    // 获取账号服务器
    hosts:'/api/agent/hosts',
    // 获取用户资料  编辑用户
    userdetail:'/api/user/detail/',
    // 用户划转
    usertransfer:'/api/user/transfer',
    // 添加用户
    usercreate:'/api/user/create',
    // 用户身份证银行卡图片头像上传
    userupload:'/api/user/upload',
}

export const API = {
    // 用户登录
    login:'https://api.gqfxcn.com/passport/login',
    // 用户退出登录
    logout:'https://api.gqfxcn.com/passport/logout',
    // 登录用户资料
    userinfo:'https://api.gqfxcn.com/userinfo',
    // Broker Work用户管理
    users:'https://api.gqfxcn.com/users',
    // 获取账号服务器
    hosts:'https://api.gqfxcn.com/agent/hosts',
}