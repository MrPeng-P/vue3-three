<script lang="ts">
import { defineComponent } from 'vue';
import allStore from '@/store'
import  {routes,routerConfig} from '@/router/router';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({

    setup() {
        const router = useRouter()
        let defaultRoute = {
            name: '系统管理',
            path: '',
            meta: { title: '系统管理', icon: '', affix: true, transition: 'slide-left' },
            children: [
                {
                    path: 'xitong',
                    name: 'xitong',
                    component: () => import('@/pages/views/test/test.vue'),
                    meta: { title: 'xitong', icon: '', affix: true, transition: 'slide-right' }
                }]
        }
        routerConfig.addRoute('index', defaultRoute)
        routerConfig.replace(routerConfig.currentRoute.value.fullPath)
        console.log(routerConfig.getRoutes());
        const { menu } = allStore()

        const { changeMenu } = menu

        let allMethods = {
            loginIn: () => {
                changeMenu([defaultRoute])
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