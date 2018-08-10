/**
 * Created by 叶子 on 2017/7/30.
 */
import { combineReducers } from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        case type.USER_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
        case type.USER_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        case type.LANGUAGE_DATA:
            return {...state,lang:action.lang}
        default:
            return {...state};
    }
};

export default combineReducers({
    httpData
});
