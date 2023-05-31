import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import {  sizeData } from '@/types/meta';
export const settingStore = defineStore('setting', () => {
    let sizeData: sizeData = reactive({
        size:'default'
    })

    const allSize = {
       
        //修改activeMeta
        changeActiveSize(value:String){
            sizeData.size=value
        }
    }

    return {
        sizeData,
        ...allSize
    }
}, {
    // 配置缓存
    persist: [{
        paths: ['sizeData.size'],
        storage: sessionStorage,
        debug: true,

        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    }]

})
