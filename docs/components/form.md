# Form 表单

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script>
  export default {
    data() {
      return {
        formModel: {
          activeName: '',
          activeArea: '',
          activeTime: [],
        },
        optionsConfig: {
          activeArea: [
            { label: '区域1', value: '1' },
            { label: '区域2', value: '2' },
          ],
        },
        formConfig: {
          labelWidth: '100px',
          size: 'small',
          class: 'c-form',
          id: 'c-form',
          rules: {
            activeName: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
            ],
          },
        },
        formItemConfig: [
          {
            type: 'input',
            prop: 'activeName',
            formItem: {
              label: '活动名称',
              class: 'active-name',
              id: 'active-name',
            },
            attrs: {
              class: 'active-name',
              id: 'asdfsdf',
            },
            on: {
              input: (val) => {
                console.log(val, 123);
              },
              clear: () => {
                console.log('clear');
              },
            },
          },
          {
            type: 'select',
            prop: 'activeArea',
            formItem: { label: '活动区域' },
            on: {
              change(val) {
                console.log(val, 'select change');
              },
            },
          },
          {
            type: 'datepicker',
            prop: 'activeTime',
            formItem: { label: '活动时间' },
            attrs: {
              type: 'daterange',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期',
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
            },
          },
        ],
      };
    },
    methods: {
      reset() {
        this.$refs.form.resetFields();
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleFormValidate(prop) {
        console.log(prop, 'prop');
      },
    },
  };
</script>

<template>
  <z-form
    ref="form"
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
    @validate="handleFormValidate"
  />
  <el-button type="primary" @click="submit">提交</el-button>
  <el-button @click="reset">重置</el-button>
</template>
```
