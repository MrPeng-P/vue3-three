<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'
import { useRouter, useRoute } from 'vue-router'
import { operateType } from '@/utils/utils'
export default defineComponent({

    name: "application-operate",
    components: {
        tkForm,
    },
    setup() {
        let typeData: any = reactive({})
        const applicationFrom: any = ref('')
        const router = useRouter()
        const route = useRoute()
        const typeList = operateType.filter(item => {
            return item.type == route.query.type
        })
        typeData = typeList[0]
        //form
        const formData: any = {
       
            name: {
                title: '渠道名称',
                type: 'input',
                key: 'name',
                width: '200',
            },
        
        }




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

        }
        onMounted(() => {
            console.log('%c ..........111.........', 'color:#31ef0e', 111)
        })
        return {
            ...allMethods,
            typeData,
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
                <span>{{ typeData.title }}</span>
                <el-button class="button" @click="operateData" :disabled="typeData.type == 'detail'">保存</el-button>
            </div>
        </template>
        <div class="content">
            <tkForm ref="applicationFrom" :formData="formData" @submit="submit" :disabledOperate="typeData.type == 'detail'">

                <template v-slot:title="slotProps">
                    {{ slotProps.item.name }}
                </template>
                <template v-slot:footer>
                    footer
                </template>
            </tkForm>
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