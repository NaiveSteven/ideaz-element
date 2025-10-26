<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ValidateField } from 'ideaz-element'

const formRef = ref()
const form = ref({
  time: [],
  a: [
    {
      name: '',
      gender: '',
      time: [],
    },
  ],
  b: [
    {
      name: '',
      gender: '',
      address: '',
      time: [],
    },
  ],
})

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    label: 'Text 1',
    field: 'a',
    max: 2,
    children: [
      {
        component: 'input',
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
    ],
  },
  {
    label: 'Text 2',
    field: 'b',
    extra: 'extra field',
    tooltip: 'Hint',
    children: [
      {
        component: 'select',
        field: 'gender',
        label: 'Gender',
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
        onFocus: () => {
          console.log('focus event')
        },
        rules: {
          required: true,
        },
      },
      {
        component: 'el-date-picker',
        field: 'time',
        label: 'Date',
        fieldProps: {
          type: 'daterange',
          startPlaceholder: 'Start date',
          endPlaceholder: 'End date',
        },
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
      },
      {
        slot: 'test',
        field: 'address',
        label: 'Address',
      },
    ],
  },
  {
    label: 'input',
    component: 'input',
    field: 'input',
  },
  {
    slot: 'operate',
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
</script>

<template>
  <z-form
    ref="formRef"
    v-model="form"
    :options="options"
    :columns="columns"
    :max="3"
    label-width="80px"
    size="default"
    type="array"
  >
    <template #test="{ formData }">
      <el-input v-model="formData.address" />
    </template>
    <template #operate>
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
