<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'

import tkTable from '@/components/tk-table/tk-table'
import { useRouter,useRoute } from 'vue-router'

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
        console.log('%c ..........route.........','color:#31ef0e',route)
        //form
        const formData: any = {
            // slots:{
            //   name:'title',
            //   type:'slots'
            // },
            name: {
                title: '财务名称',
                type: 'input',
                key: 'name',
                width: '200',
            },
          

        }
        //表格头
        const tableHead = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: '180'
        },{
            title: '代投名称',
            dataIndex: 'name',
            key: 'name',
            width: '180'
        },{
            title: '应用名称',
            dataIndex: 'name',
            key: 'name',
            width: '180'
        },  {
            title: '更新时间',
            dataIndex: 'address',
            key: 'address',
            width: '280'
        }, {
            title: '创建时间',
            dataIndex: 'address',
            key: 'address',
            width: '280'
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            slots: 'operate',
            fixed: "right",
            width: '240'
        }]
        //表格数据
        const tableData = reactive([
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
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
            { type: 'success', text: '详情', operateType: 'detail' },
            { type: 'warning', text: '编辑', operateType: 'edit' },
            { type: 'danger', text: '删除', operateType: 'delete' },
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
                            path: route.fullPath+'-operate',
                            query: {
                                type: button.operateType
                            }
                        })
                        break;
                    case 'detail':
                        router.push({
                            path: route.fullPath+'-operate',
                            query: {
                                id: slot?.id ? slot.id : 'xxx',
                                type: button.operateType
                            }
                        })
                        break;
                    case 'edit':
                        router.push({
                            path: route.fullPath+'-operate',
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
                    <el-button type="primary" @click="operate(slotProps,{operateType:'add'})">新增</el-button>
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
.add-box{
    display: flex;
    justify-content: flex-end;
}
</style>