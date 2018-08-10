import appLocaleData from 'react-intl/locale-data/en';
import en from './en_US.json';
import enUS from 'antd/lib/locale-provider/en_US';

const en_US = {
    messages:{
        ...en
    },
    antd:enUS,
    locale:'en',
    data:appLocaleData
}
export default en_US;