import { radioItem, selectItem } from '@/types/form'
import './tk-form.scss'
export default defineComponent({
    emits: ['submit'],
    components: {
        ElInput,
        ElDatePicker,
        ElSelect,
        ElRadioGroup,
        ElRadio
    },
    props: {
        formClass: {
            type: String,
            default: ''
        },
        formData: {
            typeof: Object,
            default: () => {
                return {}
            }
        },
        labelWidth: {
            type: Number,
            default: 120
        },
        isButton: {
            type: Boolean,
            default: false
        },
        disabledOperate: {
            type: Boolean,
            default: false
        }
    },

    setup(props, content) {
        const { formData, formClass, labelWidth, isButton, disabledOperate }: { formData: any, formClass: String, labelWidth: Number, isButton: Boolean, disabledOperate: Boolean } = props
        const { emit, slots }: { emit: any, slots: any } = content
        let form: any = reactive({
        })
        const ruleFormRef = ref()
        /**
         * @desc 整体事件方法
         * @param 
         * @return 
         * @author ppc
         * @date 2023-05-19 09:35:26
        */
        const allMethods = {
            submit: () => {
                emit('submit', form)
            },
            reset: (formValue: any) => {
                if (!ruleFormRef) return
                formValue.resetFields()
            }
        }
        /**
         * @desc 下拉选择 生成子项
         * @param {selectList:[]} 下拉项列表 
         * @param {keys:['id','name']} 动态key 
         * @return 
         * @author ppc
         * @date 2023-05-19 10:12:50
        */
        const proSelect = (selectList: selectItem[], keys?: string[]) => {
            return selectList.map((item: selectItem, index: number) => {
                return <el-option
                    key={item[keys ? keys[0] : 'id']}
                    label={item[keys ? keys[1] : 'name']}
                    value={item[keys ? keys[0] : 'id']}
                />
            })

        }
        /**
         * @desc 生成单选 
         * @param radioList
         * @return 
         * @author ppc
         * @date 2023-05-19 10:36:41
        */
        const proRadio = (radioList: radioItem[]) => {
            return radioList.map((item: radioItem, index: number) => {
                return <el-radio label={item.label}>{item.name}</el-radio>
            })
        }
        /**
         * @desc 生成表单内容
         * @param item formData 的value {title :'',type}
         * @param key  formData 的key { name :{}}的name
         * @return 表单项内容
         * @author ppc
         * @date 2023-05-19 09:35:41
        */
        const typeItem = (item: any, key: any) => {
            let eleItem: any = null
            switch (item.type) {
                case 'input':
                    eleItem = <el-input v-model={form[key]} disabled={item.disabled||disabledOperate} input-style={item.width ? { width: item.width + 'px' } : ''} placeholder={item.placeholder ? item.placeholder : '请输入' + item.title} ></el-input>
                    break;
                case 'date':
                    eleItem = <el-date-picker
                        v-model={form[key]}
                        type={item.dateType}
                        disabled={item.disabled||disabledOperate}
                        placeholder={item.placeholder ? item.placeholder : '请选择' + item.title}
                    />
                    break;
                case "select":
                    eleItem = <el-select v-model={form[key]} disabled={item.disabled||disabledOperate} placeholder={item.placeholder ? item.placeholder : '请选择' + item.title} onChange={item.event.change}>
                        {proSelect(item.list, item.optionKeys)}
                    </el-select>
                    break;
                case "radio":
                    eleItem = <el-radio-group v-model={form[key]} disabled={item.disabled||disabledOperate}>
                        {proRadio(item.list)}
                    </el-radio-group>
                    break;
                case "slots":
                    eleItem = slots[item.name]({ item })
                    break;
                default:

                    break;
            }
            return eleItem
        }
        //生成 el-form
        const proFormItem = (formList: any) => {
            return formList.map((item: any) => {
                return <el-form-item prop={item} label={formData[item].title} >
                    {
                        typeItem(formData[item], item)
                    }

                </el-form-item>
            })

        }
        const test = ''

        return {
            form,
            formClass,
            formData,
            slots,
            test,
            labelWidth,
            ruleFormRef,
            isButton,
            proFormItem,
            ...allMethods
        }
    },
    render() {
        return (

            <>
                <el-form ref="ruleFormRef" model={this.form} label-width={this.labelWidth + 'px'} class={this.formClass} >
                    {this.proFormItem(Object.keys(this.formData))}
                    {this.isButton ? <el-form-item >
                        <el-button type="primary" onClick={this.submit}>查询</el-button>
                        <el-button onClick={() => { this.reset(this.ruleFormRef) }}>重置</el-button>
                    </el-form-item> : null}

                </el-form>

            </>
        )
    }
})