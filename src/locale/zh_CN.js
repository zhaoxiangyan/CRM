import appLocaleData from 'react-intl/locale-data/zh';
import cn from './zh_CN.json';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const zh_CN = {
    messages:{
        ...cn
    },
    antd:zhCN,
    locale:'en',
    data:appLocaleData
}
export default zh_CN;