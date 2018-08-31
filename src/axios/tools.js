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
    // 获取所有客户列表
    getcustomerlists:'/api/api/admin/getcustomerlists'
}

export const API = {
    // 获取登录用户资料
    userinfo:'https://api.gqfxcn.com/userinfo',
    // 获取所有Broker Work用户列表
    users:'https://api.gqfxcn.com/users',
    // 用户退出登录
    logout:'https://api.gqfxcn.com/passport/logout',
    // 用户登录
    login:'https://api.gqfxcn.com/passport/login'
}