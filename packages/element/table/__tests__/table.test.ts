import { config } from '@vue/test-utils'
import { afterAll, afterEach, describe } from 'vitest'
import * as ElComponents from 'element-plus'
import * as ZComponents from '../../index'
import type { TableCol } from '~/types'

config.global.components = {
  ...ElComponents,
  ...ZComponents,
} as any

const columns: TableCol = [
  {
    label: 'Date',
    prop: 'date',
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Address',
    prop: 'address',
  },
]

describe('table', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })
})

afterAll(() => {
  config.global.components = {}
})
