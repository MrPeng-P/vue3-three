<script lang="tsx" name="AppAside">
import tkIcon from '@/components/tk-icon/tk-icon'
import { storeToRefs } from 'pinia';
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'
import allStore from '@/store'

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
        const { setting } = allStore()
        const { sizeData,changeActiveSize } = setting
        const isDark = useDark({
            selector: 'html',
            attribute: 'class',
            valueDark: 'dark',
            valueLight: 'light',
        })
        const fromData = reactive({

        })
        let sizeValue = ref(sizeData.size)
        const optionsSize = [
            {
                value: 'small',
                label: 'small',
            }, {
                value: 'default',
                label: 'default',
            }, {
                value: 'large',
                label: 'large',
            }
        ]
        const allMethods = {
            closeSet: () => {
                const { emit } = content
                emit('changeSet')
            },
            changeSize:()=>{

            }
        }
        const slotDatas = {
            header: () => (
                <span>设置</span>
            ),
            default: () => (
                <el-form model={fromData} >
                    <el-form-item label="暗黑模式">
                        <el-switch
                            v-model={isDark.value}
                            class="dark-switch"
                            inline-prompt
                            active-icon={Moon}
                            inactive-icon={Sunny}
                        />

                    </el-form-item>
                    <el-form-item label="布局大小" class="size-box">
                        <el-radio-group v-model={sizeValue.value} onChange={()=>changeActiveSize(sizeValue.value)} >

                            {optionsSize.map((item: any) => {
                                return <el-radio-button

                                    label={item.label}
                                />
                            })}
                        </el-radio-group>
                      
                      

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

.dark-switch {
    margin-left: 24px;
}

.dark-switch ::v-deep(.el-icon) {
    color: $p-switch-icon-color;
}
.size-box ::v-deep(.el-radio-group){
    display: flex;
    flex-wrap: nowrap;

}
</style>