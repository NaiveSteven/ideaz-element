<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  age: '',
  hobby: '',
})

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const rules = {
  age: [{ required: true, message: 'Age is required' }],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'Name',
    required: true,
  },
  {
    component: 'select',
    field: 'gender',
    formItemProps: {
      required: true,
      label: 'Gender',
    },
  },
  {
    component: 'input',
    label: 'Age',
    field: 'age',
  },
  {
    component: 'input',
    label: 'Hobby',
    field: 'hobby',
    rules: {
      required: true,
      message: 'Please enter a hobby',
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
    :rules="rules"
    :column="3"
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        Submit
      </el-button>
    </template>
  </z-form>
</template>
