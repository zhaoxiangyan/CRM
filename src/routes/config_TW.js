export default {
    menus: [    // 菜单相关路由
        { key: '/app/dashboard/index', title: '首頁', icon: 'mobile', component: 'Dashboard' },
        {
            key:'/app/user',title: '用戶', icon:'user',
            subs: [
                {key: '/app/user/usermgmt', title: 'Broker Work用戶', component: 'Usermgmt'},
                {key: '/app/user/bwtauser', title: 'Trader Work用戶', component: 'Bwtauser'}
            ]
        },
        {
            key:'/app/custom',title: '客戶', icon:'team',
            subs: [
                {key: '/app/custom/customers', title: '客戶', component: 'CustomersIndex'},
                {key: '/app/custom/sales', title: '銷售機會', component: 'Sales'}
            ]
        },
        { key: '/app/accounts', title: '賬戶', icon: 'bank', component: 'AccountsIndex' },
        {
            key: '/app/ui', title: 'UI', icon: 'scan',
            subs: [
                { key: '/app/ui/icons', title: '圖標', component: 'Icons'},
                { key: '/app/ui/spins', title: '加載中', component: 'Spins'},
                { key: '/app/ui/modals', title: '對話框', component: 'Modals'},
                { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
                { key: '/app/ui/tabs', title: '標籤頁', component: 'Tabs'},
                { key: '/app/ui/banners', title: '輪播圖', component: 'Banners'},
                { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
                { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
                { key: '/app/ui/gallery', title: '畫廊', component: 'Gallery'},
                { key: '/app/ui/map', title: '地圖', component: 'MapUi'},
            ],
        },
        {
            key: '/app/animation', title: '動畫', icon: 'rocket',
            subs: [
                { key: '/app/animation/basicAnimations', title: '基礎動畫', component: 'BasicAnimations'},
                { key: '/app/animation/exampleAnimations', title: '動畫案例', component: 'ExampleAnimations'},
            ],
        },
        {
            key: '/app/table', title: '表格', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '基礎表格', component: 'BasicTable'},
            ],
        },
        {
            key: '/app/form', title: '表單', icon: 'edit',
            subs: [
                { key: '/app/form/basicForm', title: '基礎表單', component: 'BasicForm'},
            ],
        },
        {
            key: '/app/chart', title: '圖表', icon: 'area-chart',
            subs: [
                { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
                { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            ],
        },
        {
            key: '/subs4', title: '頁面', icon: 'switcher',
            subs: [
                { key: '/login', title: '登錄' },
                { key: '/findpassword', title: '忘記密碼' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth', title: '權限管理', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '基礎演示', component: 'AuthBasic' },
                { key: '/app/auth/routerEnter', title: '路由攔截', component: 'RouterEnter', auth: 'auth/testPage' },
                // auth 字段对权限进行匹配
            ],
        },
        {
            key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        },
    ],
    others: []  // 非菜单相关路由
}