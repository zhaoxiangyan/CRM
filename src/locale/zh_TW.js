import appLocaleData from 'react-intl/locale-data/zh';
import tw from './zh_TW.json';
import zhTW from 'antd/lib/locale-provider/zh_TW';
import 'moment/locale/zh-tw';

const zh_TW = {
    messages:{
        ...tw
    },
    antd:zhTW,
    locale:'en',
    data:appLocaleData
}
export default zh_TW;