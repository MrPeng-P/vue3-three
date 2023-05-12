
import { storeToRefs } from 'pinia'
import { routerConfig } from './router'
import allStore from '@/store'

class intercept {
    constructor() {

    }
    // before拦截
    static setRouterBefore() {
        routerConfig.beforeEach(async (to, from, next) => {
            const { menu } = allStore()
            const { menuData } = storeToRefs(menu)
            routerConfig.addRoute('index', menuData.value.menuList)
            routerConfig.replace(routerConfig.currentRoute.value.fullPath)
            console.log(routerConfig.getRoutes());
            next()
        })
    }
    //   resolve 拦截
    static setRouterResolve() {
        routerConfig.beforeResolve(async (to) => {

            return Promise.resolve()
        })
    }

    // after触发
    static setRouterAfter() { }
}

intercept.setRouterBefore()
// intercept.setRouterResolve()
// intercept.setRouterAfter()





export default routerConfig