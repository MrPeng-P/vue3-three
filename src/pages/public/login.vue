<script lang="ts">
import { defineComponent } from 'vue';
import allStore from '@/store'
import  {routes,routerConfig} from '@/router/router';
import { useRoute, useRouter } from 'vue-router';
import  {dealMenu} from '@/router/menu'
export default defineComponent({

    setup() {
        const router = useRouter()
        let defaultRoute = {
            name: '系统管理',
            path: 'test',
            meta: { title: '系统管理', icon: '', affix: true, transition: 'slide-left' },
            children: [
                {
                    path: 'xitong',
                    name: 'xitong',
                    component: () => import('@/pages/views/test/test.vue'),
                    meta: { title: 'xitong', icon: '', affix: true, transition: 'slide-right' }
                }]
        }
      
        const { menu } = allStore()

        const { changeMenu } = menu

        let allMethods = {
            loginIn: () => {
                const newMenu=dealMenu(routes,[defaultRoute])
                changeMenu(newMenu)
                console.log('%c ..........dealMenu(routes,defaultRoute).........','color:#31ef0e',newMenu)

                router.push('/home')
            }
        }

        return {
            ...allMethods
        }
    }
})

</script>

<template>
    <div>
        <el-button @click="loginIn()">login</el-button>
    </div>
</template>
<style scoped lang="scss"></style>