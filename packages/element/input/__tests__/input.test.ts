import { config, mount } from '@vue/test-utils'
import { ElInput } from 'element-plus'
import { Calendar, Search } from '@element-plus/icons-vue'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import ZInput from '../src/index'

config.global.components = { ZInput, ElInput, Calendar, Search }

describe('input', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('modelValue', async () => {
    const wrapper = mount({
      template: '<z-input v-model="value" placeholder="请输入" clearable/>',
      setup() {
        const value = ref('')
        return { value }
      },
    })

    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.find('input').element.placeholder).toBe('请输入')
    const input = wrapper.find('input')
    const el = wrapper.find('input').element
    const simulateEvent = (text: string, event: string) => {
      el.value = text
      el.dispatchEvent(new Event(event))
    }
    simulateEvent('test', 'input')
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('test')

    await input.trigger('focus')
    const suffix = wrapper.find('.el-input__suffix')
    expect(suffix.exists()).toBe(true)
  })

  test('prefixIcon suffixIcon component', async () => {
    const wrapper = mount({
      template: '<z-input v-model="value" :prefixIcon="search" :suffixIcon="calendar"/>',
      setup() {
        const value = ref('')
        return { value, search: markRaw(Search), calendar: markRaw(Calendar) }
      },
    })

    expect(wrapper.findComponent(Search).exists()).toBe(true)
    expect(wrapper.findComponent(Calendar).exists()).toBe(true)
  })

  test('prefixIcon suffixIcon resolve', async () => {
    const wrapper = mount({
      template: '<z-input v-model="value" :prefixIcon="setPrefixIcon" :suffixIcon="setSuffixIcon"/>',
      setup() {
        const value = ref('')
        const setPrefixIcon = () => {
          return h(resolveComponent('Search'))
        }
        const setSuffixIcon = () => {
          return h(resolveComponent('Calendar'))
        }
        return { value, setPrefixIcon, setSuffixIcon }
      },
    })

    expect(wrapper.findComponent(Search).exists()).toBe(true)
    expect(wrapper.findComponent(Calendar).exists()).toBe(true)
  })

  test('append prepend', async () => {
    const wrapper = mount({
      template: '<z-input v-model="value" class="str" prepend="prependString" append="appendString"/><z-input class="set" v-model="value" :prepend="setPrepend" :append="setAppend"/>',
      setup() {
        const value = ref('')
        const setAppend = () => {
          return h('span', 'setAppend')
        }
        const setPrepend = () => {
          return h('span', 'setPrepend')
        }
        return { value, setAppend, setPrepend }
      },
    })

    const str = wrapper.find('.str')
    expect(str.find('.el-input-group__prepend').text()).toBe('prependString')
    expect(str.find('.el-input-group__append').text()).toBe('appendString')

    const set = wrapper.find('.set')
    expect(set.find('.el-input-group__prepend').text()).toBe('setPrepend')
    expect(set.find('.el-input-group__append').text()).toBe('setAppend')
  })

  test('event', async () => {
    const handleInput = vi.fn()
    const handleChange = vi.fn()
    const handleFocus = vi.fn()
    const wrapper = mount({
      template: '<z-input v-model="value" @input="handleInput" @change="handleChange" @focus="handleFocus"/>',
      setup() {
        const value = ref('')
        return { value, handleInput, handleChange, handleFocus }
      },
    })

    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(handleFocus).toHaveBeenCalled()

    const el = wrapper.find('input').element
    const simulateEvent = (text: string, event: string) => {
      el.value = text
      el.dispatchEvent(new Event(event))
    }

    simulateEvent('1', 'input')
    await nextTick()
    expect(wrapper.vm.value).toBe('1')
  })
})

afterAll(() => {
  config.global.components = {}
})
