<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'
import { useRouter, useRoute } from 'vue-router'
import { operateType } from '@/utils/utils'
export default defineComponent({

    name: "role-operate",
    components: {
        tkForm,
    },
    setup() {
        let typeData: any = reactive({})
        const applicationFrom: any = ref('')
        const roleRef: any=ref('')
        const router = useRouter()
        const route = useRoute()
        const typeList = operateType.filter(item => {
            return item.type == route.query.type
        })
        typeData = typeList[0]
        
        //form
        const formData: any = {
            // slots:{
            //   name:'title',
            //   type:'slots'
            // },
            name: {
                title: '应用名称',
                type: 'input',
                key: 'name',
                placeholder: '应用名称',
                width: '200',
            },
            age: {
                title: '应用编号',
                type: 'input',
                key: 'age',
                width: '200'
            },

        }

        // 权限
        let getCurrentKey=reactive([])
        const defaultProps = {
            children: 'children',
            label: 'label',
        }
        const dataRole = [
            {
                id: 1,
                label: 'Level one 1',
                children: [
                    {
                        id: 4,
                        label: 'Level two 1-1',
                        children: [
                            {
                                id: 9,
                                label: 'Level three 1-1-1',
                            },
                            {
                                id: 10,
                                label: 'Level three 1-1-2',
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                label: 'Level one 2',
                children: [
                    {
                        id: 5,
                        label: 'Level two 2-1',
                    },
                    {
                        id: 6,
                        label: 'Level two 2-2',
                    },
                ],
            },
            {
                id: 3,
                label: 'Level one 3',
                children: [
                    {
                        id: 7,
                        label: 'Level two 3-1',
                    },
                    {
                        id: 8,
                        label: 'Level two 3-2',
                    },
                ],
            },
        ]



        const allMethods = {
            /**
             * @desc 点击保存
             * @param 
             * @return 
             * @author ppc
             * @date 2023-05-23 10:31:24
            */
            operateData: () => {
                applicationFrom.value.submit()
            },
            /**
             * @desc 提交接口
             * @param {data}参数
             * @return 
             * @author ppc
             * @date 2023-05-23 10:31:36
            */
            submit: (data: any) => {
                console.log('%c ..........submit.........', 'color:#31ef0e', data)

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
            backPage: () => {
                router.push(route.fullPath.split('-operate')[0])
            },
            currentChange:(data:any,vnode:any)=>{
                console.log('%c ..........getCurrentKey.........','color:#31ef0e',roleRef.value.getCheckedKeys())
            }

        }
        onMounted(() => {
            console.log('%c ..........111.........', 'color:#31ef0e', 111)
        })
        return {
            ...allMethods,
            defaultProps,
            dataRole,
            getCurrentKey,
            typeData,
            roleRef,
            applicationFrom,
            formData
        }
    }

})
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button class="button" @click="backPage">返回</el-button>
                <span>{{ typeData?.title }}</span>
                <el-button class="button" @click="operateData" :disabled="typeData.type == 'detail'">保存</el-button>
            </div>
        </template>
        <div class="content" v-if="typeData?.type != 'role'">
            <tkForm ref="applicationFrom" :formData="formData" @submit="submit"
                :disabledOperate="typeData.type == 'detail'">

                <template v-slot:footer>
                    footer
                </template>
            </tkForm>
        </div>
        <div class="content" v-else>
            <el-tree ref="roleRef" :data="dataRole" show-checkbox node-key="id" :getCurrentKey="getCurrentKey" @check-change="currentChange" :default-expanded-keys="[2, 3,7]" :default-checked-keys="[2,7]"
                :props="defaultProps" />
        </div>
    </el-card>
</template>
<style scoped lang="scss">
.box-card {
    .card-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

}
</style>