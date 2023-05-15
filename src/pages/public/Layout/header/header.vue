<script lang="tsx" name="AppHeader">
import AppUser from './user.vue'
interface head {
    layoutList: number[]
}
const AppHeader = defineComponent({
    components: {
        AppUser
    },
    props: {

        headFrom: {
            type: Object,
            default: () => {
                return {

                }
            }
        }
    },
    setup(props) {
        console.log(props);


        //头部生成
        const getHeader = (list: number[]) => {
            console.log(list);

            return list.map((item: number, index: number) => {

                if (index == list.length - 1) {
                    console.log(index);
                    
                    return <el-col span={item}><AppUser></AppUser></el-col>
                }else if(index==0){
                    return <el-col span={item}><svg-icon name={'edit'} size="20px"></svg-icon> <el-icon size={20}><Edit /></el-icon></el-col>
                    
                } else {
                    return <el-col span={item}></el-col>
                }
               
            })
        }

        return () => (
            <el-row>

                {getHeader(props.headFrom.layoutList)}
            </el-row>
        )


    }
})
export default AppHeader
</script>