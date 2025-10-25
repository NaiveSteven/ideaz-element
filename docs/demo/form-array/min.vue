<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ValidateField } from 'ideaz-element'

const formRef = ref()
const formData = ref([{
  name: '',
  gender: '',
  time: [],
}])

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
    modifier: 'trim',
    label: 'Name',
    required: true,
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date of Birth',
    fieldProps: {
      type: 'daterange',
      startPlaceholder: 'Start date',
      endPlaceholder: 'End date',
    },
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean, fields: ValidateField) => {
    console.log(formData.value, fields, 'config.formData')
    if (valid)
      ElMessage.success('success')

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
    :min="1"
    label-width="80px"
    size="small"
    type="array"
  />
  <div class="mt-4 w-full flex">
    <el-button class="w-full" @click="reset">
      Reset
    </el-button>
    <el-button type="primary" class="w-full" @click="submit">
      Submit
    </el-button>
  </div>
</template>
