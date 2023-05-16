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
    min-width: $header-height;
    min-height: $header-height;
    .avator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $header-height*0.7;
    height: $header-height*0.7;
    background-color: #fff4d8;
    border-radius: 50%;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
}
}

</style>