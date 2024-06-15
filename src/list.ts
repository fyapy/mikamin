import {type List, type AnyObject, type HandleSchema, Types, Rule} from './types.js'
import {fireEachRule, handleArrayLikeField, normalizeRules} from './utils.js'

const errorBase = {
  __type: Types.List,
}
export function handleList(
  list: List,
  name: string,
  value: any,
  language: string,
  accumulator: AnyObject,
  __handleSchema: HandleSchema,
) {
  handleArrayLikeField(
    list.__rules,
    name,
    value,
    language,
    accumulator,
    errorBase,
  )

  if (Array.isArray(value) && value.length !== 0) {
    let hasError = false
    const errorsList = [] as Array<AnyObject | string | null>

    if (Array.isArray(list.__schema) || typeof list.__schema?.valid === 'function') {
      const rules = normalizeRules(list.__schema as Rule | Rule[])

      for (const [index, val] of value.entries()) {
        const errors = fireEachRule(rules, name, val, language)
        if (errors) {
          hasError = true
          errorsList[index] = errors
        } else {
          errorsList[index] = null
        }
      }
    } else {
      for (const [index, val] of value.entries()) {
        const errors = __handleSchema({
          schema: list.__schema,
          values: val || {},
          language,
        })

        if (Object.keys(errors).length !== 0) {
          hasError = true
          errorsList[index] = errors
        } else {
          errorsList[index] = null
        }
      }
    }

    if (hasError) {
      if (!accumulator[name]) {
        accumulator[name] = {...errorBase}
      }
      if (!accumulator[name].inner) accumulator[name].inner = errorsList
    }
  }
}
