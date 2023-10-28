import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import ZCheckCard from '../src/index'
import type { CheckCardItemProps } from '../src/props'

config.global.components = { ZCheckCard }

const options: CheckCardItemProps[] = [{ title: 'Jack', value: 'Jack' }, { title: 'Rose', value: 'Rose' }, { title: 'Alice', value: 'Alice' }, { title: 'Bob', value: 'Bob', disabled: true }]

const getList = (wrapper: VueWrapper<ComponentPublicInstance>, cls = '') => {
  const className = `.z-check-card${cls}`
  return wrapper
    .findAll(className)
}

const getTitleList = (wrapper: VueWrapper<ComponentPublicInstance>, cls = '') => {
  const className = `.z-check-card${cls}`
  return wrapper
    .findAll(className)
    .map(item => (item ? item.find('.z-check-card__header').text() : ''))
}

describe('check-card', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('options', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" />',
      setup() {
        const value = ref('Jack')
        const opts = ref([...options])
        return { value, opts }
      },
    })

    const list = getList(wrapper)
    expect(getTitleList(wrapper)).toEqual(['Jack', 'Rose', 'Alice', 'Bob'])
    expect(list[0].classes()).toContain('z-check-card--checked')
    await (wrapper.vm.opts as any).push({ title: 'Steven', value: 'Steven' })
    expect(getTitleList(wrapper)).toEqual(['Jack', 'Rose', 'Alice', 'Bob', 'Steven'])
    expect(list[3].classes()).toContain('z-check-card--disabled')
  })

  test('multiple', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="options" :multiple="true"/>',
      setup() {
        const value = ref(['Jack'])
        return { value, options }
      },
    })

    const list = getList(wrapper)
    expect(getTitleList(wrapper)).toEqual(['Jack', 'Rose', 'Alice', 'Bob'])
    expect(list[0].classes()).toContain('z-check-card--checked')
    await list[1].trigger('click')
    expect(list[1].classes()).toContain('z-check-card--checked')
    expect((wrapper.vm.value as any)).toEqual(['Jack', 'Rose'])
  })

  test('alias', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" :alias="alias" />',
      setup() {
        const value = ref('Jack')
        const alias = {
          title: 'data.label',
          value: 'data.key',
        }
        const opts = ref([
          {
            data: {
              label: 'Jack',
              key: 'Jack',
            },
            avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
            description: 'Jack description',
          },
          {
            data: {
              label: 'Rose',
              key: 'Rose',
            },
            avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
            description: 'Rose description',
          },
          {
            data: {
              label: 'Alice',
              key: 'Alice',
            },
            avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
            description: 'Alice description',
          },
        ])
        return { value, opts, alias }
      },
    })

    const list = getList(wrapper)
    expect(getTitleList(wrapper)).toEqual(['Jack', 'Rose', 'Alice'])
    expect(list[0].classes()).toContain('z-check-card--checked')
    expect(list[0].find('.z-check-card__description').text()).toBe('Jack description')
    await list[1].trigger('click')
    expect(list[1].classes()).toContain('z-check-card--checked')
    expect((wrapper.vm.value as any)).toBe('Rose')
  })

  test('disabled', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="options" :disabled="true" />',
      setup() {
        const value = ref('')
        return { value, options }
      },
    })

    const list = getList(wrapper)
    expect(getTitleList(wrapper)).toEqual(['Jack', 'Rose', 'Alice', 'Bob'])
    list.forEach((item) => {
      expect(item.classes()).toContain('z-check-card--disabled')
    })
  })

  test('loading', async () => {
    const wrapper = mount({
      template: '<z-check-card loading />',
    })

    expect(wrapper.find('.is-animated').exists()).toBe(true)
  })

  test('extra', async () => {
    const handleClick = vi.fn()
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" />',
      setup() {
        const value = ref('Jack')
        const opts = [
          {
            title: 'Jack',
            avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
            description: 'Jack description',
            value: 'Jack',
            extra: () => h(
              'div',
              { class: 'my-extra' },
              h('a', { onClick: handleClick }, '查看详情'),
            ),
          },
        ]
        return { value, opts }
      },
    })

    const list = getList(wrapper)
    expect(list[0].find('.my-extra').text()).toBe('查看详情')
    await wrapper.find('.my-extra > a').trigger('click')
    expect(handleClick).toHaveBeenCalled()
  })

  test('custom title', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" />',
      setup() {
        const value = ref('Jack')
        const opts = [
          {
            title: () => h('span', { class: 'my-title' }, 'Jack'),
            description: 'Jack description',
            value: 'A',
          },
        ]
        return { value, opts }
      },
    })

    expect(wrapper.find('.my-title').text()).toBe('Jack')
  })

  test('custom description', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" />',
      setup() {
        const value = ref('Jack')
        const opts = [
          {
            title: 'Jack',
            avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
            value: 'A',
            description: () => h(
              'div',
              {},
              h(
                'span',
                {},
                'Jack description',
              ),
            ),
          },
        ]
        return { value, opts }
      },
    })

    expect(wrapper.find('.z-check-card__description').text()).toBe('Jack description')
  })

  test('custom avatar', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" />',
      setup() {
        const value = ref('Jack')
        const opts = [
          {
            title: 'Jack',
            avatar: () => h('span', { class: 'my-avatar' }, 'Jack avatar'),
            value: 'A',
          },
        ]
        return { value, opts }
      },
    })

    expect(wrapper.find('.my-avatar').text()).toBe('Jack avatar')
  })

  test('cover', async () => {
    const wrapper = mount({
      template: '<z-check-card v-model="value" :options="opts" />',
      setup() {
        const value = ref('Jack')
        const opts = [
          {
            cover: () => h('img', {
              alt: 'example',
              src: 'https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ',
            }),
            value: 'A',
          },
        ]
        return { value, opts }
      },
    })

    expect(wrapper.find('.z-check-card__cover').exists()).toBe(true)
  })
})

afterAll(() => {
  config.global.components = {}
})
