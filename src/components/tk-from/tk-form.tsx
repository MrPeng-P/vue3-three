import './tk-form.scss'
export default defineComponent({
    emits: ['submit'],
    components: {
        ElInput,
        ElDatePicker
    },
    props: {
        formData: {
            typeof: Object,
            default: () => {
                return {}
            }
        }
    },

    setup(props, content) {
        const { formData }: { formData: any } = props
        const { emit } = content
        const form: any = reactive({
        })
        const allMethods = {
            submit: () => {
                emit('submit', form)
            }
        }

        const typeItem = (item: any, key: any) => {
            let eleItem: any = null
            switch (item.type) {
                case 'input':
                    eleItem = <el-input v-model={form[key]} placeholder={item.placeholder ? item.placeholder : '请输入' + item.title} ></el-input>
                    break;
                case 'date':
                    eleItem = <el-date-picker
                        v-model={form[key]}
                        type={item.dateType}
                        placeholder={item.placeholder ? item.placeholder : '请选择' + item.title}
                    />
                    break;
                case "select":
                    eleItem = <el-select v-model={form[key]} placeholder={item.placeholder ? item.placeholder : '请选择' + item.title}>
                       
                    </el-select>
                default:
                    break;
            }
            return eleItem
        }
        //生成 el-form
        const proFormItem = (formList: any) => {
            return formList.map((item: any) => {
                return <el-form-item label={formData[item].title}>

                    {
                        typeItem(formData[item], item)
                    }

                </el-form-item>
            })

        }


        return () => (
            <>
                <el-form model={form} label-width="120px">
                    {proFormItem(Object.keys(formData))}
                </el-form>
                <el-button onClick={allMethods.submit}>提交</el-button>
            </>
        )
    }
})