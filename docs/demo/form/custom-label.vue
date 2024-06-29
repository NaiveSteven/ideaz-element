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
    label: () => h('span', {}, '姓名'),
    error: 'error message',
    required: true,
  },
  {
    component: 'select',
    field: 'gender',
    label: 'labelSlot',
    required: true,
    error: h('span', {}, 'errorSlot'),
  },
  {
    component: 'input',
    field: 'age',
    label: '年龄',
    required: true,
    error: 'errorSlot',
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
    :columns="columns"
    :options="options"
    label-width="90px"
    size="small"
  >
    <template #labelSlot>
      <span>性别</span>
    </template>
    <template #errorSlot>
      <span>年龄必填</span>
    </template>
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
