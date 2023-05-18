<script lang="tsx" name="AppHeader">
import AppBreadcrumb from './breadcrumb.vue'
import AppUser from './user.vue'
import tkIcon from '@/components/tk-icon/tk-icon'

interface head {
    layoutList: number[]
}

const AppHeader = defineComponent({
    components: {
        AppUser,
        tkIcon,
        AppBreadcrumb
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

            return list.map((item: any, index: number) => {
                let ele:any=null
                switch(item.name){
                    case 'collapse':
                        ele= <el-icon size={20} class="collapse-box" onClick={taggerCollapse}><tk-icon  showIcon={props.isCollapse ? 'Expand' : 'Fold'} type="show"></tk-icon></el-icon>
                    break
                    case 'breadcrumb':
                        ele=<AppBreadcrumb></AppBreadcrumb>
                    break
                    case 'any':
                        ele
                    break
                    case 'appUser':
                        ele=<AppUser></AppUser>
                    break
                }
                return <el-col span={item.span}>{ele}</el-col>
              

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