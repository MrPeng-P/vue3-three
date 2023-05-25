import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/pages/public/Layout/index.vue'
import menuList from './menu'


// 递归匹配路由
function forFindRouter(path: string, menu: Array<any>): any {
    let meta = {}
    function digui(menu: Array<any>) {
        for (let i = 0; i < menu.length; i++) {
            if (!menu[i]['children'] && path === menu[i]['path']) {  //是菜单并且path相同
                meta = menu[i]['meta'] || null
            }
            if (menu[i]['children'] && path !== menu[i]['path']) { //不是菜单未找到
                digui(menu[i]['children'])
            }
        }
    }
    digui(menu)
    return meta
}
export const menuModel = [{
    path: 'home',
    name: 'home',
    component: () => import('@/pages/views/home/p-home.vue'),
    meta: { title: '首页', icon: 'HomeFilled',hidden:false, transition: 'slide-left' }
},{
    path: 'three-p-three',
    name: 'three',
    component: () => import('@/pages/views/three/p-three.vue'),
    meta: { title: 'three', icon: 'HomeFilled',hidden:true, transition: 'slide-left' }
},{
    path: 'system',
    name: 'system',
    meta: { title: '系统管理', icon: 'Avatar', affix: true, transition: 'slide-left' },
    children: [{
        path: 'system-p-user',
        name: 'user',
        component: () => import('@/pages/views/system/p-user.vue'),
        meta: { title: '用户管理', icon: 'User', affix: true, transition: 'slide-left' },
    }, {
        path: 'system-p-role',
        name: 'role',
        component: () => import('@/pages/views/system/p-role.vue'),
        meta: { title: '角色管理', icon: 'Avatar', affix: true, transition: 'slide-left' },
    }, {
        path: 'system-p-menu',
        name: 'menu',
        component: () => import('@/pages/views/system/p-menu.vue'),
        meta: { title: '菜单管理', icon: 'Menu', affix: true, transition: 'slide-left' },
    }]
}, {
    path: 'work',
    name: 'work',
    meta: { title: '工作管理', icon: 'Stamp', affix: true, transition: 'slide-left' },
    children: [{
        path: 'work-p-application',
        name: 'application',
        component: () => import('@/pages/views/work/p-application.vue'),
        meta: { title: '应用管理', icon: 'MessageBox', affix: true, transition: 'slide-left' },

    },
    {
        path: 'work-p-application-operate',
        name: 'application-operate',
        component: () => import('@/pages/views/work/p-application-operate.vue'),
        meta: { title: '应用管理-操作', icon: 'MessageBox', hidden: true, affix: true, transition: 'slide-left' },
    },
    {
        path: 'work-p-business',
        name: 'business',
        component: () => import('@/pages/views/work/p-business.vue'),
        meta: { title: '商务管理', icon: 'FirstAidKit', affix: true, transition: 'slide-left' },
    }, {
        path: 'work-p-channel',
        name: 'channel',
        component: () => import('@/pages/views/work/p-channel.vue'),
        meta: { title: '渠道管理', icon: 'Connection', affix: true, transition: 'slide-left' },
    }, {
        path: 'work-p-finance',
        name: 'finance',
        component: () => import('@/pages/views/work/p-finance.vue'),
        meta: { title: '财务管理', icon: 'Coin', affix: true, transition: 'slide-left' },
    }, {
        path: 'work-p-proxy',
        name: 'proxy',
        component: () => import('@/pages/views/work/p-proxy.vue'),
        meta: { title: '代投管理', icon: 'Monitor', affix: true, transition: 'slide-left' },
    }]
}, {
    path: 'data',
    name: 'data',
    meta: { title: '数据管理', icon: 'Histogram', affix: true, transition: 'slide-left' },
    children: [{
        path: 'data-p-proxy-data',
        name: 'proxyData',
        component: () => import('@/pages/views/data/p-proxy-data.vue'),
        meta: { title: '代投数据导入', icon: 'Histogram', affix: true, transition: 'slide-left' },
    }]
}, {
    path: 'report',
    name: 'report',
    meta: { title: '报表管理', icon: 'TrendCharts', affix: true, transition: 'slide-left' },
    children: [{
        path: 'report-p-statistical',
        name: 'statistical',
        component: () => import('@/pages/views/report/p-statistical.vue'),
        meta: { title: '统计报表', icon: 'TrendCharts', affix: true, transition: 'slide-left' },
    }, {
        path: 'report-p-financial',
        name: 'financial',
        component: () => import('@/pages/views/report/p-financial.vue'),
        meta: { title: '财务报表', icon: 'TrendCharts', affix: true, transition: 'slide-left' },
    }]
}]

// 自动生成路由
function createRouterFromFile() {


    const children: any = []
    const modules = import.meta.glob('../pages/views/*/*')
    const keys = Object.keys(modules)
    for (let i = 0; i < keys.length; i++) {
        let component = modules[keys[i]]
        let strArr = keys[i].replace(/[.]/g, '/').split('/').reverse()
        if (keys[i].includes('/p-')) {  //组件为p-开头会自动添加路由  p-demo p-test p-xxxx  p-cccc-ccc
            let path = `/${[strArr[2]]}-${strArr[1]}`
            let title = `${[strArr[2]]}-${strArr[1]}`
            let meta = forFindRouter(path, menuList)
            children.push({
                path,
                title,
                meta,
                component
            })
        }
    }
    console.log('%c ..........children.........','color:#31ef0e',children)
    // store.commit('SET_ROUTERCOMPONENTS', children)
    return children
}


export const noPath = [{
    path: '/login',
    name: 'login',
    component: () => import('@/pages/public/login.vue')
},
{
    path: '/403',
    name: '403',
    component: () => import('@/pages/public/403.vue')
},
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/public/404.vue')
}]

export const routes: Array<RouteRecordRaw> =
    [

        {
            path: '/',
            // component: defineAsyncComponent(() => import('/src/pages/home/index.vue'))  //使用defineAsyncComponent来包裹  rc版本
            component: Layout,
            name: 'index',
            redirect: 'home',
            meta: {},
            children: [{
                path: 'home',
                name: 'home',
                component: () => import('@/pages/views/home/p-home.vue'),
                meta: { title: '首页', icon: 'HomeFilled', hidden: true, transition: 'slide-left' }
            },
          
            ...createRouterFromFile()
                // ...menuModel
            ]
        },
        ...noPath
    ]
export const routerConfig = createRouter({
    // history: createWebHistory(), // ===>mode:"history"
    history: createWebHashHistory(), // ===>mode:"哈希"
    routes
})


