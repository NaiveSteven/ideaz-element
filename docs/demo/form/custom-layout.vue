<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
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
    required: true,
    span: 24,
  },
  {
    component: 'select',
    field: 'gender',
    label: '性别',
    span: 12,
  },
  {
    component: 'input',
    label: '年龄',
    field: 'age',
    span: 12,
  },
  {
    span: 24,
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
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
