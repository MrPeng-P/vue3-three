
 
import { userStore } from './user/user'
import { menuStore } from './menu/menu'

 const allStore =()=>{
    return {
        user:userStore(),
        menu:menuStore()
    }
}
export default allStore