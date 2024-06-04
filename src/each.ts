import {type Each, type AnyObject, Types} from './types.js'
import {fileEachRule, handleArrayLikeField, normalizeRules} from './utils.js'

const eachErrorBase = {
  __type: Types.Each,
}
export function handleEach(
  each: Each,
  name: string,
  value: any,
  language: string,
  accumulator: AnyObject,
) {
  handleArrayLikeField(
    each.__rules,
    name,
    value,
    language,
    accumulator,
    eachErrorBase,
  )

  if (each.__eachRules && Array.isArray(value) && value.length !== 0) {
    const rules = normalizeRules(each.__eachRules)
    let hasError = false
    const errorsList = [] as Array<string | null>

    for (const [index, val] of value.entries()) {
      const errors = fileEachRule(rules, name, val, language)
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
