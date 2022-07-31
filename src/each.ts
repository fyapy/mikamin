import type {
  Each,
  AnyObject,
  ErrorFormater,
} from './types'
import { fileEachRule, handleArrayLikeField, normalizeRules } from './utils'

const eachErrorBase = {
  __type: 'each',
}
export function handleEach(
  each: Each,
  name: string,
  value: any,
  formater: ErrorFormater,
  accumulator: AnyObject,
) {
  handleArrayLikeField(
    each.__rules,
    name,
    value,
    formater,
    accumulator,
    eachErrorBase,
  )

  if (each.__eachRules && Array.isArray(value) && value.length !== 0) {
    const rules = normalizeRules(each.__eachRules)
    let hasError = false
    const errorsList = [] as Array<string | null>

    for (const [index, val] of value.entries()) {
      const errors = fileEachRule(rules, name, val, formater)
      if (errors) {
        hasError = true
        errorsList[index] = errors
      } else {
        errorsList[index] = null
      }
    }

    if (hasError) {
      if (!accumulator[name]) {
        accumulator[name] = {
          ...eachErrorBase,
        }
      }
      if (!accumulator[name].inner) accumulator[name].inner = errorsList
    }
  }
}
