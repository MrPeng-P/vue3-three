<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import http from '@/request/axios'

export default defineComponent({

  name: "首页",
  components: {
  },
  setup() {
    let test=ref('')
    test.value='22'
    const allMethods={
      getList:()=>{
        fetch("https://play.google.com/store/apps/details?id=constanc.jodanj&pli=1")
    .then(res => console.log('%c ..........res.........','color:#31ef0e',res))
        // console.log('%c ..........fetch.........','color:#31ef0e',fetch)
        // http.get('https://play.google.com/store/apps/details?id=constanc.jodanj&pli=1')
      }
    }
    onMounted(() => {
     
    })

    return {
      ...allMethods
    }
  }

})
</script>

<template>
  <div>
    <!-- https://play.google.com/store/apps/details?id=constanc.jodanj&pli=1 -->
    <el-button @click="getList"> 接口</el-button>

    <!-- <tkForm :formData="formData" @submit="submitData">

                <template v-slot:title="slotProps">
                  {{slotProps.item.name }}
                </template>
                <template v-slot:footer>
                  footer
                </template>
              </tkForm> -->
    <!-- <tkTable :tableData="tableData" :tableHead="tableHead" :formData="formData" @queryData="queryData">
        <template #operate="slotProps">
          <el-button v-for="button in buttons" :key="button.text" :type="button.type" text
            @click="operate(slotProps, button)">{{ button.text }}</el-button>
        </template>
      </tkTable> -->
  </div>
</template>
<style scoped></style>