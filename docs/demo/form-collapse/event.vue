<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeCollapse = ref(['Text', 'Title'])
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
    label: 'Text',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: 'Name',
        onInput: (val: string) => {
          console.log(val, 'input event')
        },
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    label: 'Title',
    children: [
      {
        component: 'select',
        field: 'gender',
        label: 'Gender',
        md: 12,
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
        label: 'Date of Birth',
        md: 12,
        fieldProps: {
          type: 'daterange',
          startPlaceholder: 'Start date',
          endPlaceholder: 'End date',
        },
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
      },
    ],
  },
  {
    slot: 'operate',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('Success')
      console.log(formData.value, 'config.formData')
    }
    else {
      console.log('error submit!!')
      return false
    }
  })
}

function handleCollapseChange(val: string) {
  console.log(val, 'val')
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    v-model:activeCollapse="activeCollapse"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="collapse"
    @collapse-change="handleCollapseChange"
  >
    <template #operate>
      <div class="mt-4 w-full flex">
        <el-button class="w-full" @click="reset">
          Reset
        </el-button>
        <el-button class="w-full" type="primary" @click="submit">
          Submit
        </el-button>
      </div>
    </template>
  </z-form>
</template>
