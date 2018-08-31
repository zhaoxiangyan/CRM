import { combineReducers } from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        case type.USER_DATA:
            return {...state, isFetching: false,data:action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        case type.LANGUAGE_DATA:
            return {...state,lang:action.lang}
        case type.PHONE_DATA:
            return {...state,code:action.data.map( r=>{return {'value':r.value,'option':r[action.lang],'img':r.img} })};
        case type.AUTH_DATA:
            return {...state,user:action.data};
        default:
            return {...state};
    }
};

const httpUser = (state = {},action)=>{
    switch (action.type) {
        case type.USER_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
}


export default combineReducers({
    httpData,httpUser
});
