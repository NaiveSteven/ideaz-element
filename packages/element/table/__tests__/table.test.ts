import { config } from '@vue/test-utils'
import { afterAll, afterEach, describe } from 'vitest'
import ZTable from '../src/Table'

config.global.components = { ZTable }

describe('table', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })
})

afterAll(() => {
  config.global.components = {}
})
