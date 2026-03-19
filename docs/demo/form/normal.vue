<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
})

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    component: ElInput,
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
    component: 'select',
    field: 'gender',
    label: 'Gender',
    onChange: (val: string) => {
      console.log(val, 'change event')
    },
    onFocus: () => {
      console.log('focus event')
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
    onChange: (val: string[]) => {
      console.log(val, 'change event')
    },
  },
  {
    slot: 'button',
  },
]

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
