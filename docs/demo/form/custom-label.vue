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
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: () => h('span', {}, 'Name'),
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
    label: 'Age',
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
      <span>Gender</span>
    </template>
    <template #errorSlot>
      <span>Age is required</span>
    </template>
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        Submit
      </el-button>
    </template>
  </z-form>
</template>
