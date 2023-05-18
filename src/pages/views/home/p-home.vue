<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'
import { useDark, useToggle } from '@vueuse/core'

export default defineComponent({

  name: "首页",
  components: {
    tkForm,
  },
  setup() {
    const value1 = ref('')
    const formData: any = {
      name: {
        title: '姓名',
        type: 'input',
        key: 'name',
        placeholder: '姓名'
      },
      age: {
        title: '年龄',
        type: 'input',
        key: 'age',
      },
      brithday: {
        title: '生日',
        type: 'date',
        dateType: 'date',
        key: 'brithday',
      },
      role: {
        title: '服务商',
        type: 'select',
        list: [{
          id: 1,
          name: '山东'
        },{
          id: 1,
          name: '山西'
        }],
        key: 'role',
      }
    }
    const isDark = useDark({
      selector: 'html',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    })
    const toggleDark = useToggle(isDark)
    const allMethods = {
      submitData: (data: any) => {
        console.log('%c ..........data.........', 'color:#31ef0e', data)
      }
    }
    onMounted(() => {
    })
    return {
      toggleDark,
      ...allMethods,
      value1,
      formData
    }
  }

})
</script>

<template>
  <div>


    <tkForm :formData="formData" @submit="submitData"></tkForm>
  </div>
</template>
<style scoped></style>