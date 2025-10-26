<!-- eslint-disable no-console -->
<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { h, ref } from 'vue'

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
    label: () => h('span', 'Group 1'),
    children: [
      {
        component: 'input',
        field: 'name',
        label: 'Name',
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    label: 'labelSlot',
    children: [
      {
        component: 'select',
        field: 'gender',
        label: 'Gender',
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
      alert('submit!')
      console.log(formData.value, 'config.formData')
    }
    else {
      console.log('error submit!!')
      return false
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
    label-width="80px"
    size="small"
    type="group"
  >
    <template #labelSlot>
      Copy 2
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
