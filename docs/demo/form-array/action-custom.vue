<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElIcon, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import type { ValidateField } from 'ideaz-element'

interface FormData {
  name: string
  gender: string
  address: string
  time: string[]
}

const formRef = ref()
const form = ref<FormData[]>([{
  name: '',
  gender: '',
  address: '',
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
  {
    slot: 'address',
    label: 'Address',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean, fields: ValidateField) => {
    console.log(form.value, fields, 'config.formData')
    if (valid)
      ElMessage.success('success')

    else
      console.log('error')
  })
}

function handleDelete(index: number) {
  form.value.splice(index, 1)
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="form"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="small"
    type="array"
  >
    <template #address="{ formData }">
      <el-input v-model="formData.address" />
    </template>
    <template #action="{ index }">
      <ElIcon size="16" class="delete cursor-pointer" @click="handleDelete(index)">
        <Delete />
      </ElIcon>
    </template>
  </z-form>
  <div class="mt-4 w-full flex">
    <el-button class="w-full" @click="reset">
      Reset
    </el-button>
    <el-button type="primary" class="w-full" @click="submit">
      Submit
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.delete {
  position: absolute;
  top: -8px;
  right: 0;
  color: red;
}
</style>
