<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'

import tkTable from '@/components/tk-table/tk-table'
import { useRouter,useRoute } from 'vue-router'
import {menuModel} from '@/router/router'
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
        const tableAttr={
            'row-key':"path"
        }
        //form
        const formData: any = {
            // slots:{
            //   name:'title',
            //   type:'slots'
            // },
            name: {
                title: '菜单名',
                type: 'input',
                key: 'name',
                width: '200',
            },
          

        }
        //表格头
        const tableHead = [{
            title: '菜单名',
            dataIndex: 'title',
            key: 'meta.title',
        }, {
            title: '路径',
            dataIndex: 'path',
            key: 'path',

        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            slots: 'operate',
            fixed: "right",
            width: '240'
        }]
        //表格数据
        const tableData:any = menuModel
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
                console.log('%c ..........slot.........', 'color:#31ef0e', slot, button)
                switch (button.operateType) {
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
            tableAttr,
            ...allMethods,
            value1,
            formData
        }
    }

})
</script>

<template>
    <div>
        <tkTable :tableData="tableData" :tableAttr="tableAttr" :tableHead="tableHead" :formData="formData" @queryData="queryData">
            <template #operate="slotProps">
                <el-button v-for="button in buttons" :key="button.text" :type="button.type" text
                    @click="operate(slotProps, button)">{{ button.text }}</el-button>
            </template>
        </tkTable>
    </div>
</template>
<style scoped></style>