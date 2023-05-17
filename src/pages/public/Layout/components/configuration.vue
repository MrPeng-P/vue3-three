<script lang="tsx" name="AppAside">
import tkIcon from '@/components/tk-icon/tk-icon'
import { useDark, useToggle } from '@vueuse/core'
import {  Moon, Sunny } from '@element-plus/icons-vue'
const configuration = defineComponent({
    components: {
        tkIcon
    },
    props: {
        openSelect: {
            type: Boolean,
            default: false
        }
    },
    setup(props, content) {

        const isDark = useDark({
            selector: 'html',
            attribute: 'class',
            valueDark: 'dark',
            valueLight: 'light',
        })
        const fromData=reactive({
            
        })
      
        const allMethods = {
            closeSet: () => {
                const { emit } = content
                emit('changeSet')
            },
            
        }
        const slotDatas = {
            header: () => (
                <span>设置</span>
            ),
            default: () => (
                <el-form model={fromData} label-width="120px">
                    <el-form-item label="暗黑模式">
                        <el-switch
                        v-model={isDark.value}
                        class="dark-switch"
                        inline-prompt
                        active-icon={Moon}
                        inactive-icon={Sunny}
                    />
                    </el-form-item>
                   
                </el-form>
            ),
            footer: () => (
                <div>footer</div>
            )
        }
        return () => (
            <el-drawer v-model={props.openSelect} before-close={allMethods.closeSet} direction="rtl" v-slots={slotDatas}>

            </el-drawer>
        )
    },
})

export default configuration
</script>
 
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.title {
    margin-left: 10px;
}

.el-tooltip__trigger {
    .subitem {
        span {
            display: none;
        }
    }
}

.dark-switch{
    margin-left: 24px;
}
.dark-switch ::v-deep(.el-icon){
    color: $p-switch-icon-color;
}

</style>