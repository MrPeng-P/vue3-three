import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
export const menuStore = defineStore('menu', () => {
    //     ref() 就是 state 属性
    // computed() 就是 getters
    // function() 就是 actions
    let menuData: any = reactive({
        menuList: []
    })
    /**
     * @desc 修改菜单
     * @param 
     * @return 
     * @author ppc
     * @date 2023-05-12 16:11:12
    */
    function changeMenu(list: any) {
        console.log('%c ..........list.........','color:#31ef0e',list)
        menuData.menuList = list
    }
    return {
        menuData,
        changeMenu
    }
}, {
    // 配置缓存
    persist: [{
        paths: ['menuData.menuList'],
        storage: localStorage,
        debug: true,
        beforeRestore: (ctx) => {
            console.log(`即将恢复 '${ctx.store.$id}'`)
        },
        afterRestore: (ctx) => {
            console.log(`刚刚恢复完 '${ctx.store.$id}'`)
        },
        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    }]

})
