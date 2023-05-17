<script lang="tsx" name="AppUser">
import { useRoute } from 'vue-router';
import allStore from '@/store';
import tkIcon from '@/components/tk-icon/tk-icon'


const AppMeta = defineComponent({
    components: {
      
        tkIcon
    },
    props: {
        user: {

        }
    },
    setup(props) {
        const route = useRoute()
        const { meta } = allStore()
        const { deleteMeta, metaData } = meta
        const menuEle = (metaList: any) => {
            return metaList.map((item: any) => {
                return (<div class={'meta-item'}><el-icon class={'logo'}><tk-icon showIcon={item.meta.icon} type="show"></tk-icon></el-icon> {item.meta.title} <el-icon class={'close'}><tk-icon  showIcon={'Close'} type="show"></tk-icon></el-icon>   </div>)
            })
        }
        console.log('%c ..........meta.........', 'color:#31ef0e', meta, metaData)
        return () => (
            <div class={'meta-box'}>
                <div class={'meta-box-set'}>{menuEle(metaData.metaList)}</div>
            </div>

        )
    }
})
export default AppMeta

</script>

<style lang="scss" scoped>
.meta-box {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid $p-border-color;
    cursor: pointer;
    .meta-box-set {
        display: flex;
        overflow-x: auto;

        .meta-item {
            display: flex;
            align-items: center;
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: auto;

            margin-right: 10px;
            padding: 5px 5px;
            font-size: 12px;
            border: 1px solid $p-border-color;
            .logo{
                font-size: 10px;
                margin-right: 5px;
            }
            .close{
                margin-left: 5px;
            }
        }
    }

}
</style>