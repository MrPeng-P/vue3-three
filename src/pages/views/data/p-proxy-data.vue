<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'

import tkTable from '@/components/tk-table/tk-table'
import { useRouter, useRoute } from 'vue-router'

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
        console.log('%c ..........route.........', 'color:#31ef0e', route)
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
        },  {
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
        },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            slots: 'operate',
            fixed: "right",
            width: '80',

        }]
        //表格数据
        const tableData = reactive([
            {   
                id:1,
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id:2,

                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ])

        // 表格按钮
        const buttons = [
            { type: 'warning', text: '编辑', operateType: 'edit' },
        ] as const

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
            operate: (slot: any, button: any) => {
                switch (button.operateType) {
                    case 'add':
                        router.push({
                            path: route.fullPath + '-operate',
                            query: {
                                type: button.operateType
                            }
                        })
                        break;
                    case 'detail':
                        router.push({
                            path: route.fullPath + '-operate',
                            query: {
                                id: slot?.id ? slot.id : 'xxx',
                                type: button.operateType
                            }
                        })
                        break;
                    case 'edit':
                        router.push({
                            path: route.fullPath + '-operate',
                            query: {
                                id: slot?.id ? slot.id : 'xxx',
                                type: button.operateType
                            }
                        })
                        break;
                    case 'delete':

                        break;
                    default:
                        break;
                }
            }
        }
        onMounted(() => {
        })
        return {
            tableData,
            tableHead,
            buttons,
            ...allMethods,
            value1,
            formData
        }
    }

})
</script>

<template>
    <div>

        <tkTable :tableData="tableData" :tableHead="tableHead" :formData="formData" @queryData="queryData">
            <template #head="slotProps">
                <div class="add-box">
                    <el-button type="primary" @click="">批量导入</el-button>
                    <el-button type="primary" @click="">导出数据</el-button>

                    <el-button type="primary" @click="operate(slotProps, {operateType:'add'})">新增</el-button>
                </div>
            </template>
            <template #operate="slotProps">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" text
                    @click="operate(slotProps, button)">{{ button.text }}</el-button>
            </template>
        </tkTable>
    </div>
</template>
<style scoped>
.add-box {
    display: flex;
    justify-content: flex-end;
}
</style>