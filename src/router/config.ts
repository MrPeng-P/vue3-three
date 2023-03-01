
import router from './router'
class intercept {
    // before拦截
    static setRouterBefore() {
        router.beforeEach(async (to, from, next) => {
            next()
        })
    }
    //   resolve 拦截
    static setRouterResolve() {
        router.beforeResolve(async (to) => {

            return Promise.resolve()
        })
    }

    // after触发
    static setRouterAfter() { }
}

intercept.setRouterBefore()
// intercept.setRouterResolve()
// intercept.setRouterAfter()





export default router