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
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = computed(() => [
  {
    component: 'el-input',
    field: 'name',
    label: 'Name',
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
    'label': 'Table',
    'onUpdate:data': (data: RowData[]) => {
      console.log(data, 'data')
      formData.value.tableData = data
    },
    'fieldProps': {
      data: formData.value.tableData,
      toolBar: false,
      columns: [
        {
          label: 'Name',
          prop: 'name',
        },
        {
          component: 'el-input',
          label: 'Address',
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
          Reset
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          Submit
        </el-button>
      </div>
    </template>
  </z-form>
</template>
