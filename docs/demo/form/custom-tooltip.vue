<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  age: '',
})

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
    tooltip: {
      reference: () => h('span', {}, '？'),
      content: '姓名提示',
    },
    extra: 'extraSlot',
    required: true,
  },
  {
    component: 'select',
    field: 'gender',
    label: '性别',
    colon: false,
    tooltip: () => h('span', {}, '性别提示'),
    required: true,
  },
  {
    component: 'input',
    label: '年龄',
    field: 'age',
    formItemProps: {
      tooltip: {
        reference: 'tooltipSlot',
        content: '提示内容',
      },
      colon: false,
    },
  },
  {
    slot: 'button',
  },
]

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
    :column="2"
    colon
  >
    <template #tooltipSlot>
      <el-icon class="cursor-pointer">
        <i-delete />
      </el-icon>
    </template>
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
