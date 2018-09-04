import * as type from './type';
// import * as http from '../axios/index';

// const requestData = category => ({
//     type: type.REQUEST_DATA,
//     category
// });
// export const receiveData = (data, category) => ({
//     type: type.RECEIVE_DATA,
//     data,
//     category
// });
// /**
//  * 请求数据调用方法
//  * @param funcName      请求接口的函数名
//  * @param params        请求接口的参数
//  */
// export const fetchData = ({funcName, params, stateName}) => dispatch => {
//     !stateName && (stateName = funcName);
//     dispatch(requestData(stateName));
//     return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
// };











// server
// 用户登录 token  (权限？？？)
export const tokenAction = (data) =>({
    type:type.token_DATA,
    data
});
// 登录用户资料
export const userAction = (data, category) =>({
    type:type.user_DATA,
    data,
    category
})


// client
// 响应式
export const responsiveAction = (data) => ({
    type: type.responsive_DATA,
    data
});
// 国际化
export const langAction = data =>({
    type:type.lang_DATA,
    data
});
// 手机区号选项
export const phone_codeAction = (data,lang) =>({
    type:type.phone_code_DATA,
    data,
    lang
})