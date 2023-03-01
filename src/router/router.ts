import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"

const routes:Array<RouteRecordRaw> = [
    {
        path: '',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/home',
        name: 'home',
        // component: defineAsyncComponent(() => import('/src/pages/home/index.vue'))  //使用defineAsyncComponent来包裹  rc版本
        component: () => import('@/pages/home/home.vue'),
        children: [
            {
                path: '',
                redirect: {
                    name: ``
                }
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