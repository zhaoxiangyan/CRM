import React from 'react';
import ReactDOM from 'react-dom';
import './style/lib/animate.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware,compose } from 'redux';
import reducer from './reducer';
import { AppContainer } from 'react-hot-loader';
import Page from './Page';
import {LocaleProvider} from 'antd';
import {IntlProvider, addLocaleData} from 'react-intl';
import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US';
import zh_TW from './locale/zh_TW';
import axios from 'axios';

// redux 注入操作
const middleware = [thunk];
// const store = createStore(reducer, applyMiddleware(...middleware));
const store = createStore(reducer,compose(applyMiddleware(...middleware),window.devToolsExtension?window.devToolsExtension():f=>f))
console.log(store.getState());

// 国际化  暂时全局刷新实现
// localStorage.setItem('lang', 'zh_CN');
var appLocale;
switch (localStorage.getItem('lang')){
    case 'zh_CN': 
        appLocale = zh_CN;
        axios.defaults.headers['x-api-lang']='zh_cn';
        break;
    case 'zh_TW': 
        appLocale = zh_TW;
        break;
    case 'en_US': 
        appLocale = en_US;
        break;
    default:
        appLocale = en_US; 
        localStorage.setItem('lang','en_US');
}
addLocaleData(appLocale.data);

const render = Component => {   // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(
        <AppContainer>
            <LocaleProvider locale={appLocale.antd}>
                <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                    <Provider store={store}>
                        <Component store={store} />
                    </Provider>
                </IntlProvider>
            </LocaleProvider> 
        </AppContainer>
        ,
        document.getElementById('root')
    );
};

render(Page);

// Webpack Hot Module Replacement API
if (module.hot) {
    // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
    // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
    // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (...args) => { // eslint-disable-line no-console
        if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
            // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };
    module.hot.accept('./Page', () => {
        render(Page);
    })
}

// ReactDOM.render(
//     <AppContainer>
//         <Provider store={store}>
//             <CRouter store={store} />
//         </Provider>
//     </AppContainer>
//  ,
//   document.getElementById('root')
// );
registerServiceWorker();