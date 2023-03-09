import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/pages/public/Layout/index.vue'

const routes:Array<RouteRecordRaw> = [
  
    {
        path: '/',
        // component: defineAsyncComponent(() => import('/src/pages/home/index.vue'))  //使用defineAsyncComponent来包裹  rc版本
        component: Layout,
        redirect: 'home',
        children: [
            {
                path: '/home',
                name: '/home',
                component: () => import('@/pages/home/home.vue'),
                meta: { title: '首页', affix: true ,transition: 'slide-left'}
            },
            {
                path: 'test',
                name: 'test',
                component: () => import('@/pages/test/test.vue'),
                meta: { title: 'test', affix: true ,transition: 'slide-right'}
            },
        ]
    },
]
const routerConfig = createRouter({
    // history: createWebHistory(), // ===>mode:"history"
    history: createWebHashHistory(), // ===>mode:"哈希"
    routes
})
export default routerConfig