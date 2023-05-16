<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name:"首页",
  setup() {
   
    
    onMounted(() => {
    })
    return {
    }
  }

})
</script>

<template>
  <div>
    <el-button type="primary">Primary</el-button>
    <el-button>  <svg-icon name="HomeFilled" size="20px"></svg-icon>  <el-icon><HomeFilled /></el-icon>123123</el-button>
  </div>
</template>
<style scoped></style>