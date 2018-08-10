export default {
    menus: [    // 菜单相关路由
        { key: '/app/dashboard/index', title: 'Home', icon: 'mobile', component: 'Dashboard' },
        {
            key:'/app/user',title: 'Users', icon:'user',
            subs: [
                {key: '/app/user/mgmt', title: 'Broker Work Users', component: 'Usermgmt'},
                {key: '/app/user/bwta', title: 'Trader Work Users', component: 'Bwtauser'}
            ]
        },
        {
            key: '/app/ui', title: 'UI', icon: 'scan',
            subs: [
                { key: '/app/ui/buttons', title: 'Button', component: 'Buttons'},
                { key: '/app/ui/icons', title: 'Icon', component: 'Icons'},
                { key: '/app/ui/spins', title: 'Loading', component: 'Spins'},
                { key: '/app/ui/modals', title: 'Dialog', component: 'Modals'},
                { key: '/app/ui/notifications', title: 'Notification', component: 'Notifications'},
                { key: '/app/ui/tabs', title: 'Label', component: 'Tabs'},
                { key: '/app/ui/banners', title: 'Sowing', component: 'Banners'},
                { key: '/app/ui/wysiwyg', title: 'Editer', component: 'WysiwygBundle'},
                { key: '/app/ui/drags', title: 'Drag drop', component: 'Drags'},
                { key: '/app/ui/gallery', title: 'Gallery', component: 'Gallery'},
                { key: '/app/ui/map', title: 'Map', component: 'MapUi'},
            ],
        },
        {
            key: '/app/animation', title: 'Animation', icon: 'rocket',
            subs: [
                { key: '/app/animation/basicAnimations', title: 'Basic animation', component: 'BasicAnimations'},
                { key: '/app/animation/exampleAnimations', title: 'Animation case', component: 'ExampleAnimations'},
            ],
        },
        {
            key: '/app/table', title: 'Table', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: 'Base table', component: 'BasicTable'},
                { key: '/app/table/advancedTable', title: 'Advanced table', component: 'AdvancedTable'},
                { key: '/app/table/asynchronousTable', title: 'Asynchronous table', component: 'AsynchronousTable'},
            ],
        },
        {
            key: '/app/form', title: 'Form', icon: 'edit',
            subs: [
                { key: '/app/form/basicForm', title: 'Basic form', component: 'BasicForm'},
            ],
        },
        {
            key: '/app/chart', title: 'Chart', icon: 'area-chart',
            subs: [
                { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
                { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            ],
        },
        {
            key: '/subs4', title: 'Page', icon: 'switcher',
            subs: [
                { key: '/login', title: 'Sign in' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth', title: 'Anthority management', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: 'Basic demo', component: 'AuthBasic' },
                { key: '/app/auth/routerEnter', title: 'Routing interception', component: 'RouterEnter', auth: 'auth/testPage' },
                // auth 字段对权限进行匹配
            ],
        },
        {
            key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        },
    ],
    others: []  // 非菜单相关路由
}