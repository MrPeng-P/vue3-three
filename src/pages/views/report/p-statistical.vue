<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'

import tkTable from '@/components/tk-table/tk-table'
import { useRouter, useRoute } from 'vue-router'
import { TableColumnCtx } from 'element-plus'
interface Product {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}
interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
export default defineComponent({

    name: "首页",
    components: {
        tkForm,
        tkTable
    },
    setup() {
        const value1 = ref('')
        const router = useRouter()
        const route = useRoute()
        //form
        const formData: any = {
            // slots:{
            //   name:'title',
            //   type:'slots'
            // },

            brithday: {
                title: '日期',
                type: 'date',
                dateType: 'daterange',
                key: 'brithday',
            },
            name: {
                title: '投放方',
                type: 'input',
                key: 'name',
                placeholder: '姓名',
                width: '200',
            },
            qudao: {
                title: '投放渠道',
                type: 'input',
                key: 'name',
                placeholder: '姓名',
                width: '200',
            },
            qudao1: {
                title: '渠道号',
                type: 'input',
                key: 'name',
                placeholder: '姓名',
                width: '200',
            },
            key: {
                title: '关键词',
                type: 'input',
                key: 'name',
                placeholder: '姓名',
                width: '200',
            },
        }
        //表格头
        const tableHead = [{
            title: '日期',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '投放渠道',
            dataIndex: 'date',
            key: 'date',

        }, {
            title: '投放方',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '关键词',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '应用',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '应用编号',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'Spends',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'Impression',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'Clicks',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'CTR',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'Installs',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'CVR',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'CPI',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'AJ注册数',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'AJ新付费数',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'CPP',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '付费率',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'a_firstcharge(AJ新增充值）',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: 'ROAS',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '服务费',
            dataIndex: 'address',
            key: 'address',
        },]
        //表格数据
        const tableData = reactive([
            {
                id: 1,
                date: '222',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id: 2,

                date: '111',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '111',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '111',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ])
        const getSummaries = (param: SummaryMethodProps) => {
            const { columns, data } = param
            const sums: string[] = []
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '701汇总'
                    return
                }
                const values = data.map((item:any) => Number(item[column.property]))
                if (!values.every((value) => Number.isNaN(value))) {
                    sums[index] = `${values.reduce((prev, curr) => {
                        const value = Number(curr)
                        if (!Number.isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0)}`
                } else {
                    sums[index] = 'N/A'
                }
            })

            return sums
        }
        const tableAttr = {
            'show-summary': true,
            'summary-method': getSummaries
        }

        const allMethods = {
            submitData: (data: any) => {
                console.log('%c ..........data.........', 'color:#31ef0e', data)
            },
            /**
             * @desc 表格查询
             * @param 
             * @return 
             * @author ppc
             * @date 2023-05-22 11:28:16
            */
            queryData: (data: any) => {
                console.log('%c ..........表格查询data.........', 'color:#31ef0e', data)
            },

        }
        onMounted(() => {
        })
        return {
            tableData,
            tableHead,
            ...allMethods,
            value1,
            tableAttr,
            formData
        }
    }

})
</script>

<template>
    <div>
        <tkTable :tableData="tableData" :tableAttr="tableAttr" :tableHead="tableHead" :formData="formData"
            @queryData="queryData">
            <template #head="slotProps">
                <div class="table-box">
                    <div class="table-total">
                        <div>余额：<span>2343245</span></div>
                        <div>服务费：<span>546666</span></div>
                    </div>
                    <div class="add-box">
                        <el-button type="primary" @click="">导出数据</el-button>
                    </div>
                </div>
            </template>
        </tkTable>
    </div>
</template>
<style scoped lang="scss">
.table-box {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 600;

    .table-total {
        display: flex;

        span {
            margin-right: 20px;
            font-size: 14px;
            color: $p-sum-text-color;

        }
    }
}

.add-box {
    display: flex;
    justify-content: flex-end;
}
</style>