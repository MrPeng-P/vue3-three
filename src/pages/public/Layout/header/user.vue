<script lang="tsx" name="AppUser">
import allStore from '@/store'
import { storeToRefs } from 'pinia';


const AppUser = defineComponent({
    props: {
        user: {

        }
    },
    setup(props) {
        const {user}=allStore()
        console.log(user);
        
        // const {userInfo}= storeToRefs(user)
        const {userInfo}= user
        
        const userDom = () => {
            return <div class={'avator'}>{userInfo.name}</div>
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
    min-width: 60px;
    min-height: 60px;
    .avator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #fff4d8;
    border-radius: 50%;
    font-weight: 600;
    cursor: pointer;
}
}

</style>