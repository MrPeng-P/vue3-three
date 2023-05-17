
 
import { userStore } from './user/user'
import { menuStore } from './menu/menu'
import { metaStore } from './meta/meta'

 const allStore =()=>{
    return {
        user:userStore(),
        menu:menuStore(),
        meta:metaStore()
    }
}
export default allStore