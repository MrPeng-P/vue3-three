<script lang="tsx" name="AppUser">
import allStore from '@/store'
import { useRouter } from 'vue-router';


const AppUser = defineComponent({
    props: {
        user: {

        }
    },
    setup(props) {
        const {user,menu}=allStore()
        console.log(user,);
        const router=useRouter()
        const {userInfo}= user
        const allMethods={
            outLogin:()=>{
                menu.changeMenu([])
                router.push('/login')
            }
        }
        const userDom = () => {
            return <div class={'avator'} onClick={allMethods.outLogin}><el-avatar> {userInfo.name} </el-avatar></div>
        }
        return () => (
            <div class={'use-box'}>{userDom()}</div>

        )
    }
})
export default AppUser

</script>

<style lang="scss" scoped>
.use-box{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: $header-height;
    min-height: $header-height;
    .avator {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4d8;
    border-radius: 50%;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
}
}

</style>