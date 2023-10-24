import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test } from 'vitest'
import ZWatermark from '../src/index'

config.global.components = { ZWatermark }

describe('watermark', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('content', async () => {
    const wrapper = mount({
      template: '<z-watermark content="content"><div style="height: 500px" /></z-watermark>',
    })

    expect(wrapper).toMatchSnapshot()
  })

  test('multiline', async () => {
    const wrapper = mount({
      template: '<z-watermark :content="content"><div style="height: 500px" /></z-watermark>',
      setup() {
        return {
          content: ['multiline', 'multiline'],
        }
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  test('picture watermark', async () => {
    const wrapper = mount({
      template: `<z-watermark height="36" width="36" image="https://avatars.githubusercontent.com/u/42891983?v=4">
      <div class="h-500px">
        <p>
          这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容。
        </p>
        <p>
          这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容。
        </p>
        <p>
          这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容。
        </p>
      </div>
    </z-watermark>`,
    })

    expect(wrapper).toMatchSnapshot()
  })

  test('custom config', async () => {
    const wrapper = mount({
      template: '<z-watermark content="content" rotate="46" font-color="purple" font-size="20" z-index="20"><div style="height: 500px" /></z-watermark>',
    })

    expect(wrapper).toMatchSnapshot()
  })
})

afterAll(() => {
  config.global.components = {}
})
