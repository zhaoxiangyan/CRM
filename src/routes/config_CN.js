export default {
    menus: [    // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key:'/app/user',title: '用户', icon:'user',
            subs: [
                {key: '/app/user/usermgmt', title: 'Broker Work用户', component: 'Usermgmt'},
                {key: '/app/user/bwtauser', title: 'Trader Work用户', component: 'Bwtauser'}
            ]
        },
        {
            key:'/app/custom',title: '客户', icon:'team',
            subs: [
                {key: '/app/custom/customers', title: '客户', component: 'CustomersIndex'},
                {key: '/app/custom/sales', title: '销售机会', component: 'Sales'}
            ]
        },
        { key: '/app/accounts', title: '账户', icon: 'bank', component: 'AccountsIndex' },
        { key: '/app/tasks', title: '任务', icon: 'folder', component: 'Tasks'},
        // {
        //     key: '/app/ui', title: 'UI', icon: 'scan',
        //     subs: [
        //         { key: '/app/ui/icons', title: '图标', component: 'Icons'},
        //         { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
        //         { key: '/app/ui/modals', title: '对话框', component: 'Modals'},
        //         { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
        //         { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
        //         { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
        //         { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
        //         { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
        //         { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
        //         { key: '/app/ui/map', title: '地图', component: 'MapUi'},
        //     ],
        // },
        // {
        //     key: '/app/animation', title: '动画', icon: 'rocket',
        //     subs: [
        //         { key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
        //         { key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
        //     ],
        // },
        // {
        //     key: '/app/table', title: '表格', icon: 'copy',
        //     subs: [
        //         { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
        //     ],
        // },
        // {
        //     key: '/app/form', title: '表单', icon: 'edit',
        //     subs: [
        //         { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
        //     ],
        // },
        // {
        //     key: '/app/chart', title: '图表', icon: 'area-chart',
        //     subs: [
        //         { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
        //         { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
        //     ],
        // },
        // {
        //     key: '/subs4', title: '页面', icon: 'switcher',
        //     subs: [
        //         { key: '/login', title: '登录' },
        //         { key: '/findpassword', title: '忘记密码' },
        //         { key: '/404', title: '404' },
        //     ],
        // },
        // {
        //     key: '/app/auth', title: '权限管理', icon: 'safety',
        //     subs: [
        //         { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
        //         { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
        //         // auth 字段对权限进行匹配
        //     ],
        // },
        // {
        //     key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        // },
    ],
    others: [
        
    ]  // 非菜单相关路由
}