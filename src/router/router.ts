import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/pages/public/Layout/index.vue'

export const routes: Array<RouteRecordRaw> =
    [

        {
            path: '/',
            // component: defineAsyncComponent(() => import('/src/pages/home/index.vue'))  //使用defineAsyncComponent来包裹  rc版本
            component: Layout,
            name: 'index',
            redirect: 'home',
            children: [{
                path: 'home',
                name: 'home',
                component: () => import('@/pages/views/home/home.vue'),
                meta: { title: '首页', icon: '', affix: true, transition: 'slide-left' }
            }]
        },
        {
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
        }
    ]
export const routerConfig = createRouter({
    // history: createWebHistory(), // ===>mode:"history"
    history: createWebHashHistory(), // ===>mode:"哈希"
    routes
})


