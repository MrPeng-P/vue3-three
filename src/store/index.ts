
 
import { userStore } from './user/user'
import { menuStore } from './menu/menu'
import { metaStore } from './meta/meta'
import { settingStore } from './setting/setting'
 const allStore =()=>{
    return {
        user:userStore(),
        menu:menuStore(),
        meta:metaStore(),
        setting:settingStore(),

    }
}

export default allStore