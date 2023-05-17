<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
export default defineComponent({
  name: "首页",
  setup() {
    const isDark = useDark({
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    })
    const toggleDark = useToggle(isDark)

    onMounted(() => {
    })
    return {
      toggleDark
    }
  }

})
</script>

<template>
  <div>
    <el-button> <svg-icon name="HomeFilled" size="20px"></svg-icon> <el-icon>
        <HomeFilled />
      </el-icon>123123</el-button>
  </div>
</template>
<style scoped></style>