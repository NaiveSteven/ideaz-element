import { config, mount } from '@vue/test-utils'
import * as ElComponents from 'element-plus'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import * as ZComponents from '../../index'
import type { FormColumn } from '../../types'

config.global.components = {
  ...ElComponents,
  ...ZComponents,
} as any

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'name',
    tooltip: 'nameTooltip',
    extra: 'nameExtra',
    colon: false,
  },
  {
    component: 'select',
    field: 'sex',
    label: 'sex',
    tooltip: () => h('span', 'sexTooltip'),
    extra: () => h('span', 'sexExtra'),
  },
  {
    component: 'datepicker',
    field: 'date',
    label: 'date',
    formItemProps: {
      tooltip: 'date',
      extra: 'extraSlot',
      colon: false,
    },
  },
]

const groupColumns = [
  {
    label: 'text1',
    borderStyle: 'dashed',
    description: 'text1Description',
    children: [
      {
        component: 'input',
        field: 'name',
        label: 'name',
      },
    ],
  },
  {
    label: () => h('span', 'text2'),
    contentPosition: 'center',
    key: 'text2',
    description: 'text2Description',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: 'sex',
      },
      {
        component: 'datepicker',
        field: 'date',
        label: 'date',
      },
    ],
  },
]

function getOptions() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '.el-select-dropdown__item',
    ),
  )
}

function getInputValue(wrapper: VueWrapper<ComponentPublicInstance>, index: number) {
  return (wrapper.findAll('.el-input__inner').at(index) as any).element.value
}

const options = { sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }], age: [{ label: '18', value: '18' }, { label: '16', value: '16' }] }

function getLabelList(wrapper: VueWrapper<ComponentPublicInstance>) {
  return wrapper.findAll('.el-form-item__label').map(item => item.text())
}

describe('form', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('render', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    const labelList = getLabelList(wrapper)
    expect(labelList).toEqual(['name', 'sex', 'date'])
    expect(wrapper.find('.el-form--large').exists()).toBe(true)

    expect(wrapper.findAll('.select-trigger').length).toBe(1)
    await wrapper.find('.select-trigger').trigger('click')
    await nextTick()
    const data = getOptions()
    expect((wrapper.vm.value as any).sex).toBe('')
    expect(getInputValue(wrapper, 1)).toBe('')

    data[1].click()
    await nextTick()
    expect((wrapper.vm.value as any).sex).toBe('female')
    expect(getInputValue(wrapper, 1)).toBe('female')
  })

  it('columns', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    expect(wrapper.findAll('.el-form-item').length).toBe(3);
    (wrapper.vm.cols as FormColumn[]).push({ component: 'input', label: 'address', field: 'address' })
    await nextTick()
    expect(wrapper.findAll('.el-form-item').length).toBe(4)
  })

  it('hide', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          component: 'input',
          field: 'name',
          label: 'name',
          class: 'my-input',
          hide: () => value.value.sex === 'male',
        }, {
          component: 'select',
          field: 'sex',
          label: 'sex',
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-input').exists()).toBe(true);
    ((wrapper.vm.value as any).sex) = 'male'
    await nextTick()
    expect(wrapper.find('.my-input').exists()).toBe(false);
    ((wrapper.vm.value as any).sex) = 'female'
    await nextTick()
    expect(wrapper.find('.my-input').exists()).toBe(true)
  })

  it('content slot', async () => {
    const wrapper = mount({
      template: `<z-form v-model="value" :columns="cols" :options="options" size="large">
        <template #name>
          <el-input v-model="value.name" class="my-input" />
        </template>
      </z-form>`,
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          slot: 'name',
          label: 'name',
        }, {
          component: 'select',
          field: 'sex',
          label: 'sex',
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-input').exists()).toBe(true)
  })

  it('content render', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large" />',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          render: () => h('span', { class: 'my-span' }, 'content'),
          label: 'name',
        }, {
          component: 'select',
          field: 'sex',
          label: 'sex',
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-span').text()).toBe('content')
  })

  it('form item label', async () => {
    const wrapper = mount({
      template: `<z-form v-model="value" :columns="cols" :options="options" size="large">
        <template #nameSlot>
          <span class="slot-label">slotContent</span>
        </template>
      </z-form>`,
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          component: 'input',
          field: 'name',
          label: 'nameSlot',
        }, {
          component: 'select',
          field: 'sex',
          label: () => h('span', { class: 'render-label' }, 'content'),
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.slot-label').text()).toBe('slotContent')
    expect(wrapper.find('.render-label').text()).toBe('content')
  })

  it('events', async () => {
    const handleChange = vi.fn()
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([
          {
            component: 'input',
            field: 'name',
            label: 'name',
            fieldProps: {
              class: 'my-input',
            },
          },
          {
            component: 'select',
            field: 'sex',
            label: 'sex',
            onChange: handleChange,
          },
          {
            component: 'datepicker',
            field: 'date',
            label: 'date',
          },
        ])
        return { value, cols, options }
      },
    })

    expect(wrapper.findAll('.select-trigger').length).toBe(1)
    await wrapper.find('.select-trigger').trigger('click')
    await nextTick()
    const data = getOptions()
    expect((wrapper.vm.value as any).sex).toBe('')
    expect(getInputValue(wrapper, 1)).toBe('')
    data[1].click()
    await nextTick()
    expect((wrapper.vm.value as any).sex).toBe('female')
    expect(getInputValue(wrapper, 1)).toBe('female')
    expect(handleChange).toHaveBeenCalled()
  })

  describe('layout', async () => {
    it('default layout', async () => {
      const wrapper = mount({
        template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
        setup() {
          const value = ref({ name: '', sex: '', date: [], address: '' })
          const cols = ref([...columns, { component: 'input', field: 'address', label: 'address' }])
          return { value, cols, options }
        },
      })

      const labelList = getLabelList(wrapper)
      expect(labelList).toEqual(['name', 'sex', 'date', 'address'])

      const list = wrapper.findAll('.el-form-item')
      list.forEach((item) => {
        expect(item.classes()).toContain('z-col-24')
      })
    })

    it('column config', async () => {
      const wrapper = mount({
        template: '<z-form v-model="value" :columns="cols" :options="options" size="large" :column="2"/>',
        setup() {
          const value = ref({ name: '', sex: '', date: [], address: '' })
          const cols = ref([...columns, { component: 'input', field: 'address', label: 'address' }])
          return { value, cols, options }
        },
      })

      const labelList = getLabelList(wrapper)
      expect(labelList).toEqual(['name', 'sex', 'date', 'address'])

      const list = wrapper.findAll('.el-form-item')
      list.forEach((item) => {
        expect(item.classes()).toContain('z-col-xl-12')
      })
    })

    it('custom layout', async () => {
      const wrapper = mount({
        template: '<z-form v-model="value" :columns="cols" :options="options" size="large" :column="2"/>',
        setup() {
          const value = ref({ name: '', sex: '', date: [], address: '' })
          const cols = ref([
            {
              component: 'input',
              field: 'name',
              label: 'name',
              span: 24,
            },
            {
              component: 'select',
              field: 'sex',
              label: 'sex',
              span: 12,
            },
            {
              component: 'input',
              label: 'age',
              field: 'age',
              span: 12,
            },
            {
              span: 24,
              slot: 'button',
            },
          ])
          return { value, cols, options }
        },
      })
      const list = wrapper.findAll('.el-form-item')
      expect(list.length).toBe(4)
      expect(list[0].classes()).toContain('z-col-24')
      expect(list[1].classes()).toContain('z-col-12')
      expect(list[2].classes()).toContain('z-col-12')
      expect(list[3].classes()).toContain('z-col-24')
    })
  })

  it('tooltip and extra', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"><template #extraSlot>dateExtra<span></span></template></z-form>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    const list = wrapper.findAll('.el-form-item')
    list.forEach((item) => {
      expect(item.find('.z-form-item-label__icon').exists()).toBe(true)
    })
    expect(list.map(item => item.findAll('.z-form-item__extra').map(cur => cur.text())).flat(1)).toEqual(['nameExtra', 'sexExtra', 'dateExtra'])
  })

  it('colon', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large" :colon="true"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    const list = wrapper.findAll('.el-form-item')
    expect(list.length).toBe(3)
    expect(list[0].find('.el-form-item__label').text()).not.includes(':')
    expect(list[1].find('.el-form-item__label').text()).includes(':')
    expect(list[2].find('.el-form-item__label').text()).not.includes(':')
  })

  describe('group', async () => {
    it('group form', async () => {
      const wrapper = mount({
        template: '<z-form type="group" v-model="value" :columns="cols" :options="options" />',
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...groupColumns])
          return { value, cols, options }
        },
      })

      const list = wrapper.findAll('.el-form-item')
      expect(list.map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name', 'sex', 'date'])
      expect(list.length).toBe(3)
      expect(wrapper.findAll('.el-divider').map(item => item.text()).flat(1)).toEqual(['text1', 'text2'])
    })

    it('divider', async () => {
      const wrapper = mount({
        template: '<z-form type="group" v-model="value" :columns="cols" :options="options" content-position="left"/>',
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...groupColumns])
          return { value, cols, options }
        },
      })

      expect(wrapper.find('.is-left').text()).toBe('text1')
      expect(wrapper.find('.is-center').text()).toBe('text2')
    })

    it('label slot', async () => {
      const wrapper = mount({
        template: '<z-form type="group" v-model="value" :columns="cols" :options="options" content-position="left" ><template #labelSlot><span>test</span></template></z-form>',
        setup() {
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'labelSlot', children: [{ component: 'input', field: 'age', label: 'age' }] }])
          return { value, cols, options }
        },
      })

      expect(wrapper.findAll('.el-form-item').length).toBe(4)
      expect(wrapper.findAll('.el-divider').map(item => item.text()).flat(1)).toEqual(['text1', 'text2', 'test'])
    })

    it('event', async () => {
      const handleChange = vi.fn()
      const wrapper = mount({
        template: '<z-form type="group" v-model="value" :columns="cols" :options="options" content-position="left" />',
        setup() {
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'age', children: [{ component: 'select', field: 'age', label: 'age', class: 'my-select', onChange: handleChange }] }])
          return { value, cols, options }
        },
      })

      expect(wrapper.findAll('.el-form-item').length).toBe(4)
      const select = wrapper.find('.my-select')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 3)).toBe('')
      await opts[3].click()
      expect(handleChange).toHaveBeenCalled()
      expect((wrapper.vm.value as any).age).toBe('16')
      expect(getInputValue(wrapper, 3)).toBe('16')
    })

    it('resetFields', async () => {
      const wrapper = mount({
        template: '<z-form ref="form" type="group" v-model="value" :columns="cols" :options="options" content-position="left" />',
        setup() {
          const form = ref()
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'age', children: [{ component: 'select', field: 'age', label: 'age', class: 'my-select' }] }])
          return { value, cols, options, form }
        },
      })

      expect(wrapper.findAll('.el-form-item').length).toBe(4)
      const select = wrapper.find('.my-select')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 3)).toBe('')
      await opts[3].click()
      expect((wrapper.vm.value as any).age).toBe('16')
      expect(getInputValue(wrapper, 3)).toBe('16')
      await (wrapper.vm.$refs.form as any).resetFields()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 3)).toBe('')
    })
  })

  describe('array', async () => {
    it('array form', async () => {
      const wrapper = mount({
        template: '<z-form type="array" v-model="value" :columns="cols" :options="options" />',
        setup() {
          const value = ref([{ name: '', sex: '', date: [] }])
          const cols = ref([...columns])
          return { value, cols, options }
        },
      })

      const list = wrapper.findAll('.el-form-item')
      expect(list.map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name', 'sex', 'date'])
      expect(list.length).toBe(3)
      await wrapper.find('.z-form-array__add').trigger('click')
      expect(wrapper.findAll('.el-form-item').length).toBe(6)
      expect(wrapper.findAll('.el-form-item').map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name', 'sex', 'date', 'name', 'sex', 'date'])
    })

    it('max', async () => {
      const wrapper = mount({
        template: '<z-form type="array" v-model="value" :columns="cols" :options="options" :max="2" size="small"/>',
        setup() {
          const value = ref([{ name: '', sex: '', date: [] }])
          const cols = ref([...columns])
          return { value, cols, options }
        },
      })

      expect(wrapper.find('.z-array-form-operation__add--small').exists()).toBe(true)
      const list = wrapper.findAll('.el-form-item')
      expect(list.map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name', 'sex', 'date'])
      expect(list.length).toBe(3)
      await wrapper.find('.z-form-array__add').trigger('click')
      expect(wrapper.findAll('.el-form-item').length).toBe(6)
      expect(wrapper.findAll('.el-form-item').map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name', 'sex', 'date', 'name', 'sex', 'date'])
      expect(wrapper.find('.z-form-array__add').exists()).toBe(false)
      expect(wrapper.find('.z-array-form-operation__add--small').exists()).toBe(false)
    })

    it('operation', async () => {
      const wrapper = mount({
        template: '<z-form type="array" v-model="value" :columns="cols" :options="options" size="small"/>',
        setup() {
          const value = ref([{ name: '', sex: '', date: [] }])
          const cols = ref([...columns])
          return { value, cols, options }
        },
      })

      await wrapper.find('.z-array-form-operation__add--small').trigger('click')
      expect(wrapper.findAll('.el-form-item').length).toBe(6)
      await wrapper.find('.z-array-form-operation__delete--small').trigger('click')
      expect(wrapper.findAll('.el-form-item').length).toBe(3)
    })

    it('event', async () => {
      const handleChange = vi.fn()
      const wrapper = mount({
        template: '<z-form type="array" v-model="value" :columns="cols" :options="options" size="small"/>',
        setup() {
          const value = ref([{ name: '', sex: '', date: [] }])
          const cols = ref([{
            component: 'input',
            field: 'name',
            label: 'name',
            tooltip: 'nameTooltip',
            extra: 'nameExtra',
            colon: false,
          }, {
            component: 'select',
            field: 'sex',
            label: 'sex',
            onChange: handleChange,
            tooltip: () => h('span', 'sexTooltip'),
            extra: () => h('span', 'sexExtra'),
          }, {
            component: 'datepicker',
            field: 'date',
            label: 'date',
            formItemProps: {
              tooltip: 'date',
              extra: 'extraSlot',
              colon: false,
            },
          }])
          return { value, cols, options }
        },
      })

      const select = wrapper.find('.select-trigger')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value[0] as any).sex).toBe('')
      expect(getInputValue(wrapper, 1)).toBe('')
      await opts[1].click()
      expect(handleChange).toHaveBeenCalled()
      expect((wrapper.vm.value[0] as any).sex).toBe('female')
      expect(getInputValue(wrapper, 1)).toBe('female')
    })

    it('resetFields', async () => {
      const wrapper = mount({
        template: '<z-form ref="form" type="array" v-model="value" :columns="cols" :options="options" size="small"/>',
        setup() {
          const value = ref([{ name: '', sex: '', date: [] }])
          const cols = ref([...columns])
          const form = ref()
          return { value, cols, options, form }
        },
      })

      const select = wrapper.find('.select-trigger')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value[0] as any).sex).toBe('')
      expect(getInputValue(wrapper, 1)).toBe('')
      await opts[1].click()
      expect((wrapper.vm.value[0] as any).sex).toBe('female')
      expect(getInputValue(wrapper, 1)).toBe('female')
      await (wrapper.vm.$refs.form as any).resetFields()
      expect((wrapper.vm.value[0] as any).sex).toBe('')
      expect(getInputValue(wrapper, 1)).toBe('')
    })
  })

  describe('step', async () => {
    it('step form', async () => {
      const wrapper = mount({
        template: '<z-form type="step" v-model:activeStep="activeStep" v-model="value" :columns="cols" :options="options" />',
        setup() {
          const activeStep = ref(0)
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...groupColumns])
          return { value, cols, options, activeStep }
        },
      })

      const list = wrapper.findAll('.el-form-item')
      expect(list.map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name'])
      expect(list.length).toBe(2)
      expect((wrapper.vm.activeStep as number)).toBe(0)
      const buttons = wrapper.findAll('.el-button')
      expect(buttons[1].text()).toBe('next step')
      await buttons[1].trigger('click')
      await nextTick()
      expect(wrapper.find('.el-step__title').classes()).toContain('is-success')
      expect(wrapper.findAll('.el-form-item').map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['sex', 'date'])
      expect(wrapper.findAll('.el-form-item').length).toBe(3)
      expect((wrapper.vm.activeStep as number)).toBe(1)
    })

    it('label and description', async () => {
      const wrapper = mount({
        template: '<z-form type="step" v-model:activeStep="activeStep" v-model="value" :columns="cols" :options="options" />',
        setup() {
          const activeStep = ref(0)
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...groupColumns])
          return { value, cols, options, activeStep }
        },
      })

      expect(wrapper.findAll('.el-step__title').map(item => item.text()).flat(1)).toEqual(['text1', 'text2'])
      expect(wrapper.findAll('.el-step__description').map(item => item.text()).flat(1)).toEqual(['text1Description', 'text2Description'])
    })

    it('event', async () => {
      const handleChange = vi.fn()
      const wrapper = mount({
        template: '<z-form type="step" v-model="value" :columns="cols" :options="options" v-model:activeStep="active"/>',
        setup() {
          const active = ref(2)
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'age', children: [{ component: 'select', field: 'age', label: 'age', class: 'my-select', onChange: handleChange }] }])
          return { value, cols, options, active }
        },
      })

      const select = wrapper.find('.my-select')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 0)).toBe('')
      await opts[1].click()
      expect(handleChange).toHaveBeenCalled()
      expect((wrapper.vm.value as any).age).toBe('16')
      expect(getInputValue(wrapper, 0)).toBe('16')
    })

    it('resetFields', async () => {
      const wrapper = mount({
        template: '<z-form ref="form" type="step" v-model="value" :columns="cols" :options="options" v-model:activeStep="active" />',
        setup() {
          const form = ref()
          const active = ref(2)
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'age', children: [{ component: 'select', field: 'age', label: 'age', class: 'my-select' }] }])
          return { value, cols, options, form, active }
        },
      })

      const select = wrapper.find('.my-select')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 0)).toBe('')
      await opts[1].click()
      expect((wrapper.vm.value as any).age).toBe('16')
      expect(getInputValue(wrapper, 0)).toBe('16')
      await (wrapper.vm.$refs.form as any).resetFields()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 0)).toBe('')
    })
  })

  describe('collapse', async () => {
    it('collapse form', async () => {
      const wrapper = mount({
        template: '<z-form type="collapse" v-model:activeCollapse="activeCollapse" v-model="value" :columns="cols" :options="options" />',
        setup() {
          const activeCollapse = ref(['text1'])
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...groupColumns])
          return { value, cols, options, activeCollapse }
        },
      })

      const list = wrapper.findAll('.el-form-item')
      expect(list.map(item => item.findAll('.el-form-item__label').map(cur => cur.text())).flat(1)).toEqual(['name', 'sex', 'date'])
      expect(list.length).toBe(3)
      expect(list[0].isVisible()).toBe(true)
      expect(list[1].isVisible()).toBe(false)
      expect(list[2].isVisible()).toBe(false)
    })

    it('label', async () => {
      const wrapper = mount({
        template: '<z-form type="collapse" v-model:activeCollapse="activeCollapse" v-model="value" :columns="cols" :options="options" />',
        setup() {
          const activeCollapse = ref(['text1'])
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...groupColumns])
          return { value, cols, options, activeCollapse }
        },
      })

      expect(wrapper.findAll('.el-collapse-item__header').map(item => item.text()).flat(1)).toEqual(['text1', 'text2'])
    })

    it('event', async () => {
      const handleChange = vi.fn()
      const wrapper = mount({
        template: '<z-form type="collapse" v-model="value" :columns="cols" :options="options" v-model:activeCollapse="activeCollapse"/>',
        setup() {
          const activeCollapse = ref(['text1', 'age'])
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'age', children: [{ component: 'select', field: 'age', label: 'age', class: 'my-select', onChange: handleChange }] }])
          return { value, cols, options, activeCollapse }
        },
      })

      const select = wrapper.find('.my-select')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 3)).toBe('')
      await opts[3].click()
      expect(handleChange).toHaveBeenCalled()
      expect((wrapper.vm.value as any).age).toBe('16')
      expect(getInputValue(wrapper, 3)).toBe('16')
    })

    it('resetFields', async () => {
      const wrapper = mount({
        template: '<z-form ref="form" type="collapse" v-model="value" :columns="cols" :options="options" v-model:activeCollapse="activeCollapse" />',
        setup() {
          const form = ref()
          const activeCollapse = ref(['text1', 'age'])
          const value = ref({ name: '', sex: '', date: [], age: '' })
          const cols = ref([...groupColumns, { label: 'age', children: [{ component: 'select', field: 'age', label: 'age', class: 'my-select' }] }])
          return { value, cols, options, form, activeCollapse }
        },
      })

      const select = wrapper.find('.my-select')
      expect(select.exists()).toBe(true)
      await select.trigger('click')
      const opts = getOptions()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 3)).toBe('')
      await opts[3].click()
      expect((wrapper.vm.value as any).age).toBe('16')
      expect(getInputValue(wrapper, 3)).toBe('16')
      await (wrapper.vm.$refs.form as any).resetFields()
      expect((wrapper.vm.value as any).age).toBe('')
      expect(getInputValue(wrapper, 3)).toBe('')
    })
  })
})

afterAll(() => {
  config.global.components = {}
})
