import { combineReducers } from 'redux';
import * as type from '../action/type';

// const handleData = (state = {isFetching: true, data: {}}, action) => {
//     switch (action.type) {
//         case type.REQUEST_DATA:
//             return {...state, isFetching: true};
//         case type.RECEIVE_DATA:
//             return {...state, isFetching: false, data: action.data};
//         default:
//             return {...state};
//     }
// };
// const httpData = (state = {}, action) => {
//     switch (action.type) {
//         case type.RECEIVE_DATA:
//         case type.REQUEST_DATA:
//             return {
//                 ...state,
//                 [action.category]: handleData(state[action.category], action)
//             };
        
//         case type.token_DATA:
//             return {...state,user:action.data};
//         default:
//             return {...state};
//     }
// };

// const httpUser = (state = {},action)=>{
//     switch (action.type) {
//         case type.USER_DATA:
//             return {
//                 ...state,
//                 [action.category]: handleData(state[action.category], action)
//             };
//         default:
//             return {...state};
//     }
// }


// 服务器数据
const serverData = (state={},action)=>{
    switch (action.type){
        case type.user_DATA:
            return {...state,user:action.data};
        case type.token_DATA:
            return {...state,token:action.data};
        default:
            return {...state};
    }   
}

// 客户端数据
const clientData = (state={responsive:{isMobile:false}},action)=>{
    switch (action.type){
        case type.lang_DATA:
            return {...state,lang:action.data}
        case type.responsive_DATA:
            return {...state,responsive:action.data}
        case type.phone_code_DATA:
            return {...state,phone_code:action.data.map( r=>{return {'value':r.value,'option':r[action.lang],'img':r.img} })};
        default:
            return {...state};
    } 
}

export default combineReducers({
    serverData,clientData
});
