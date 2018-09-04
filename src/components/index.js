/**
 * 路由组件出口文件
 */
import React from 'react';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Icons from './ui/Icons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Wysiwyg from 'bundle-loader?lazy!./ui/Wysiwyg';  // 按需加载富文本配置
import Bundle from './widget/Bundle';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';
// 用戶
import Usermgmt from './user/Usermgmt';
import Bwtauser from './user/Bwtauser';
// 客户
import CustomersIndex from './custom/CustomersIndex';
import Sales from './custom/Sales';
// 账户
import AccountsIndex from './accounts/AccountsIndex';
// 任务
import Tasks from './tasks/Tasks';

const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default {
    BasicForm, BasicTable,
    Echarts, Recharts, Icons, Spins, Modals, Notifications,
    Tabs, Banners, Drags, Dashboard, Gallery, BasicAnimations,
    ExampleAnimations, AuthBasic, RouterEnter, WysiwygBundle,
    Cssmodule, MapUi, Usermgmt, Bwtauser, CustomersIndex, Sales,
    AccountsIndex, Tasks
}