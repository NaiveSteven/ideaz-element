import { isObject } from './is'
import { toKebabCase } from './string'

interface IndexType {
  [propName: string]: any
}

export const getEventsFromCamel = (obj: IndexType) => {
  if (!isObject(obj)) return {}
  const evts: IndexType = {}
  Object.keys(obj).forEach((key) => {
    if (key.startsWith('on')) {
      const evtName = toKebabCase(key).slice(3, toKebabCase(key).length)
      evts[evtName] = obj[key]
    }
  })
  return evts
}
