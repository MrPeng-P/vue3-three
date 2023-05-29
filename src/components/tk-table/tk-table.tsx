import tkPagination from "@/components/tk-pagination/tk-pagination"
import tkForm from "@/components/tk-from/tk-form"
import './tk-table.scss'
export default defineComponent({
    emits: ['queryData'],
    components: {
        ElTable,
        tkPagination,
        tkForm,
        ElCard
    },

    props: {
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        },

        //表格头
        tableHead: {
            type: Array,
            default: () => {
                return []
            }
        },
        //表格数据
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        pagination:{
            type: Object,
            default: () => {
                return {}
            }
        }

    },
    setup(props, content) {
        const { emit, slots,attrs }: { emit: any, slots: any ,attrs:any} = content
        console.log('%c ..........attrs.........','color:#31ef0e',attrs)
        let { formData, tableData, tableHead } = props
        //分页
        let currentPage=ref(1)
        let pageSize=ref(10)
        let total=ref(20)
        /**
         * @desc 所有方法
         * @param 
         * @return 
         * @author ppc
         * @date 2023-05-19 16:33:00
        */
       let queryData=reactive({})
        const allMethods = {
            submitData: (data: any) => {
                queryData={
                    currentPage:currentPage.value,
                    pageSize:pageSize.value,
                    ...queryData,
                    ...data,
                   
                }
                currentPage.value=data.currentPage
                pageSize.value=data.pageSize
                emit('queryData',queryData)
            }
        }

        /**
         * @desc 生成 表格
         * @param 
         * @return 
         * @author ppc
         * @date 2023-05-19 16:27:32
        */
        const proTable = (tableHead: any) => {
            return tableHead.map((item: any, index: any) => {
                if (item.slots) {
                    return <el-table-column prop={item.key} label={item.title} width={item.width} fixed={item.fixed}>
                        {{
                            default: (scope: { row: any }) => {
                                if (scope && scope.row) {
                                    return slots[item.slots](scope.row);
                                }
                            },
                        }}
                    </el-table-column>
                }
                return <el-table-column prop={item.key} label={item.title} width={item.width} fixed={item.fixed}>
                </el-table-column>
            })
        }
        return {
            tableData,
            slots,
            attrs,
            tableHead,
            formData,
            currentPage,
            pageSize,
            total,
            proTable,
            ...allMethods
        }
    },
    render() {
        return (
            <>
             <el-card class="box-card">
                <tkForm formData={this.formData} onSubmit={this.submitData} isButton={true} formClass="form-style" labelWidth={100}>
                    {{
                        title: (scope: { row: any }) => {
                            if (scope && scope.row) {
                                return scope.row;
                            }
                        }
                    }}
                </tkForm>
                {this.slots['head']?this.slots['head']():null}
                <el-table data={this.tableData} height="500" {...this.attrs.tableAttr} >
                    {
                        this.proTable(this.tableHead)
                    }
                </el-table>
                <tk-pagination total={this.total} currentPage={this.currentPage} pageSize={this.pageSize} onCurrentChange={this.submitData} onSizeChange={this.submitData}></tk-pagination>
                </el-card>
            </>
        )
    }
})