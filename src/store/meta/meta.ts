import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
export const metaStore = defineStore('meta', () => {
    let metaData: any = reactive({
        metaList: []
    })
   
    const allMeta={
        //添加
        addMeta:(item:any)=>{
            const data=metaData.metaList.some((val:any)=>{return val.meta.title==item.meta.title})
            console.log('%c ..........item.........','color:#31ef0e',metaData.metaList,data)
            if(!data){
                metaData.metaList.push(item)
            }
            
          
        },
        //删除
        deleteMeta:()=>{

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
