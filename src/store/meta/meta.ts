import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import { metaItem, metaData } from '@/types/meta';
export const metaStore = defineStore('meta', () => {
    let metaData: metaData = reactive({
        metaList: [],
        activeMeta:'/home'
    })

    const allMeta = {
        //添加
        addMeta: (item: metaItem) => {
            const data = metaData.metaList.some((val: metaItem) => { return val.meta.title == item.meta.title })
            if (!data) {
                metaData.metaList.push(item)
            }


        },
        //删除
        deleteMeta: (item: metaItem, index: number) => {
            metaData.metaList.splice(index, 1);
        },
        //修改activeMeta
        changeActiveMeta(value:String){
            metaData.activeMeta=value
        }
    }

    return {
        metaData,
        ...allMeta
    }
}, {
    // 配置缓存
    persist: [{
        paths: ['metaData.metaList'],
        storage: sessionStorage,
        debug: true,

        serializer: {
            deserialize: parse,
            serialize: stringify,
        },
    }]

})
