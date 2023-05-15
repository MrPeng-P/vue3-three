<script lang="ts">
import { defineComponent } from 'vue';
import allStore from '@/store'
import {  useRouter } from 'vue-router';
export default defineComponent({

    setup() {
        const router = useRouter()
      
      
        const { menu } = allStore()


        let allMethods = {
            loginIn: () => {
           

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