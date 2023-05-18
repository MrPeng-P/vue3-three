
import { routerConfig, routes } from './router'
import allStore from '@/store'

class intercept {
    constructor() {

    }
    // before拦截
    static setRouterBefore() {
        routerConfig.beforeEach(async (to, from, next) => {
            if (to.path = '/login') {
                const store = allStore()

                const { menu } = store
                const { changeMenu } = menu
                changeMenu(routes[0])
            }
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
    static setRouterAfter() {
        routerConfig.afterEach(async (to, from, next) => {
            if(to.fullPath!==from.fullPath){
                const store = allStore()
                const { meta } = store
                const { addMeta } = meta
                addMeta({
                    meta:to.meta,
                    fullPath:to.fullPath
                })
            }
           
        })
      
    }
}

intercept.setRouterBefore()
// intercept.setRouterResolve()
intercept.setRouterAfter()





export default routerConfig


