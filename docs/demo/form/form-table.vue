<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  name: string
  address: string
}

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
  tableData: [{ name: 'steven', address: '' }],
})

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = computed(() => [
  {
    component: 'el-input',
    field: 'name',
    label: '姓名',
    onInput: (val: string) => {
      console.log(val, 'input event')
    },
    onChange: (val: string) => {
      console.log(val, 'change event')
    },
    required: true,
  },
  {
    'component': 'z-table',
    'field': 'tableData',
    'label': '表格',
    'onUpdate:data': (data: RowData[]) => {
      console.log(data, 'data')
      formData.value.tableData = data
    },
    'fieldProps': {
      data: formData.value.tableData,
      toolBar: false,
      columns: [
        {
          label: '名称',
          prop: 'name',
        },
        {
          component: 'el-input',
          label: '地址',
          prop: 'address',
        },
      ],
    },
  },
  {
    slot: 'button',
  },
])

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid)
      console.log(formData.value, 'config.formData')

    else
      console.log('error')
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="small"
  >
    <template #button>
      <div class="w-full flex">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
