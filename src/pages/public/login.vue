<script lang="ts">
import { defineComponent } from 'vue';
import allStore from '@/store'
import { useRouter } from 'vue-router';
import tkForm from '@/components/tk-from/tk-form.jsx'

import { routes, menuModel } from '@/router/router'
export default defineComponent({
    components: {
        tkForm,
    },
    setup() {
        const router = useRouter()
        const loginFrom:any=ref('')

        const { menu } = allStore()
        const { changeMenu } = menu
        //form
        const formData: any = {
            // slots:{
            //   name:'title',
            //   type:'slots'
            // },
            name: {
                title: '用户名',
                type: 'input',
                key: 'name',
                placeholder: '请输入用户名',
                width: '200',
            },
            age: {
                title: '密码',
                type: 'input',
                key: 'age',
                width: '200'
            },


        }
        console.log('%c ..........menuModel.........','color:#31ef0e',menuModel)
        let allMethods = {
            loginIn: () => {

                changeMenu(menuModel)
                router.push('/home')
            }
        }

        return {
            ...allMethods,
            formData
        }
    }
})

</script>

<template>
    <div>
        <!-- <tkForm ref="applicationFrom" :formData="formData" @submit="submit" :disabledOperate="typeData.type == 'detail'">

            <template v-slot:title="slotProps">
                {{ slotProps.item.name }}
            </template>
            <template v-slot:footer>
                footer
            </template>
        </tkForm> -->
        <el-button @click="loginIn()">login</el-button>
    </div>
</template>
<style scoped lang="scss"></style>