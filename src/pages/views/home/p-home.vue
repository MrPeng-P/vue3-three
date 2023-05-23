<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from 'vue'
import tkForm from '@/components/tk-from/tk-form.jsx'

import tkTable from '@/components/tk-table/tk-table'
import { useRouter } from 'vue-router'

export default defineComponent({

  name: "首页",
  components: {
    tkForm,
    tkTable
  },
  setup() {
    const value1 = ref('')
    const router=useRouter()
    //form
    const formData: any = {
      // slots:{
      //   name:'title',
      //   type:'slots'
      // },
      name: {
        title: '姓名',
        type: 'input',
        key: 'name',
        placeholder: '姓名',
        width: '200',
      },
      age: {
        title: '年龄',
        type: 'input',
        key: 'age',
        width: '200'
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
        event: {
          change: () => {
            console.log('%c ..........11.........', 'color:#31ef0e', 11)
          }
        },
        optionKeys: ['id', 'name'],
        list: [{
          id: 1,
          name: '山东',

        }, {
          id: 2,
          name: '山西',
        }],
        key: 'role',
      },
      type: {
        title: '是否开启',
        type: 'radio',
        list: [{
          name: '是',
          label: true
        }, {
          name: '否',
          label: false
        }],
        key: 'type',
      },

    }
    //表格头
    const tableHead = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '180'
    }, {
      title: '生日',
      dataIndex: 'date',
      key: 'date',
      width: '180'

    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: '280'
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: '280'
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: '280'
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      slots: 'operate',
      fixed: "right",
      width: '240'
    }]
    //表格数据
    const tableData = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    // 表格按钮
    const buttons = [
      { type: 'success', text: '详情', operateType: 'detail' },
      { type: 'warning', text: '编辑', operateType: 'edit' },
      { type: 'danger', text: '删除', operateType: 'delete' },
    ] as const

    const allMethods = {
      submitData: (data: any) => {
        console.log('%c ..........data.........', 'color:#31ef0e', data)
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
      operate: (slot: any, button: any) => {
        console.log('%c ..........slot.........', 'color:#31ef0e', slot, button)
        switch (button.operateType) {
          case 'detail':
            router.push('/p-home-detail')
            break;
          case 'edit':

            break;
          case 'delete':

            break;
          default:
            break;
        }
      }
    }
    onMounted(() => {
    })
    return {
      tableData,
      tableHead,
      buttons,
      ...allMethods,
      value1,
      formData
    }
  }

})
</script>

<template>
  <div>


    <!-- <tkForm :formData="formData" @submit="submitData">

              <template v-slot:title="slotProps">
                {{slotProps.item.name }}
              </template>
              <template v-slot:footer>
                footer
              </template>
            </tkForm> -->
    <tkTable :tableData="tableData" :tableHead="tableHead" :formData="formData" @queryData="queryData">
      <template #operate="slotProps">
        <el-button v-for="button in buttons" :key="button.text" :type="button.type" text
          @click="operate(slotProps, button)">{{ button.text }}</el-button>
      </template>
    </tkTable>
  </div>
</template>
<style scoped></style>