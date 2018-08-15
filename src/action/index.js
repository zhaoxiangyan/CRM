/**
 * Created by 叶子 on 2017/7/30.
 */
import * as type from './type';
import * as http from '../axios/index';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

// 国际化
export const langData = lang =>({
    type:type.LANGUAGE_DATA,
    lang
});

export const receiveUser = (data, category) =>({
    type:type.USER_DATA,
    data,
    category
}) 
// export const receiveUser = ({funcName, params, stateName}) => dispatch => {
//     !stateName && (stateName = funcName);
//     dispatch(requestData(stateName));
//     return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
// };
// export const fetchUser = ({url}) => dispatch =>{
//     dispatch(requestData(url));
//     return http.brokerwork.then(res => dispatch(receiveUser(res)));
// }