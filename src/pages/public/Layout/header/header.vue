<script lang="tsx" name="AppHeader">
import AppUser from './user.vue'
import tkIcon from '@/components/tk-icon/tk-icon'

interface head {
    layoutList: number[]
}
const AppHeader = defineComponent({
    components: {
        AppUser,
        tkIcon
    },
    props: {

        headFrom: {
            type: Object,
            default: () => {
                return {

                }
            }
        },
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    setup(props, content) {
        console.log(props,content);
      
        const taggerCollapse = () => {
            content.emit('changeCollapse')
}
        //头部生成
        const getHeader = (list: number[]) => {

            return list.map((item: number, index: number) => {

                if (index == list.length - 1) {
                    console.log(index);

                    return <el-col span={item}><AppUser></AppUser></el-col>
                } else if (index == 0) {
                    return <el-col span={item} onClick={taggerCollapse}> <el-icon size={20} class="collapse-box"><tk-icon  showIcon={props.isCollapse ? 'Expand' : 'Fold'} type="show"></tk-icon></el-icon></el-col>

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

<style lang="scss" scoped>
    .el-row{
        display: flex;
        align-items: center;
    }
    .collapse-box{
        display: flex;
        align-items: center;
    }
</style>