<script lang="tsx" name="AppAside">
import { useRoute, useRouter } from 'vue-router'
import asideBgImage from '../../../../assets/images/aside/aside-bg.jpg'

const AppAside = defineComponent({
    props: {
        //菜单数据获取
        menuList: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    setup(props) {
        
        const route = useRoute()
        const router = useRouter()
        
        const activeIndex = computed(() => route.path.split('/').slice(-1)[0])
        
        let asiderData = reactive({//导航栏信息
            activeTextColor: '#ffd04b',
            bgColor: "rgba(0,0,0,0.2)",
            textColor: '#FFF',
            bgImage: asideBgImage
        })
        //菜单生成
        const getMenu = (menuList: any) => {
            return menuList.map((item: any) => {
                if (item.children && item.children.length > 0 && !item.hidden) {
                    const slots = {
                        title: () => (
                            <span class="flex flex-center">
                                {item.meta.icon ? (
                                    <svg-icon name={item.meta.icon} size="20px"></svg-icon>
                                ) : (
                                    ''
                                )}
                                <span class="title">{item.meta.title}</span>
                            </span>
                        ),
                    }
                    return (
                        <el-sub-menu index={item.path} v-slots={slots}>
                            {getMenu(item.children)}
                        </el-sub-menu>
                    )
                } else if (!item.hidden) {
                    return (
                        <el-menu-item index={item.path}>
                            {item.meta.icon ? (
                                <svg-icon name={item.meta.icon} size="20px"></svg-icon>
                            ) : (
                                ''
                            )}
                            <span class="title">{item.meta.title}</span>
                        </el-menu-item>
                    )
                }
            })
        }
        
        //路由跳转
        const handleSelect = (key: string, keyPath: string[]) => {
            const path = key
            router.push({
                path,
            })
        }

        return () => (
            <el-menu
                default-active={activeIndex.value}
                active-text-color={asiderData.activeTextColor}
                background-color={asiderData.bgColor}
                class="el-menu-vertical-demo"
                text-color={asiderData.textColor}
                onSelect={handleSelect}
            >
                {/* {activeIndex.value} */}
                {getMenu(props.menuList)}
            </el-menu>
        )
    },
})

export default AppAside
</script>
 
<style lang="scss" scoped>


.title {
    margin-left: 10px;
}</style>