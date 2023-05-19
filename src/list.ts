import type {
  List,
  AnyObject,
  ValidateSchema,
} from './types.js'
import { handleArrayLikeField } from './utils.js'

const eachErrorBase = {
  __type: 'list',
}
export function handleList(
  list: List,
  name: string,
  value: any,
  language: string,
  accumulator: AnyObject,
  __validateSchema: ValidateSchema,
) {
  handleArrayLikeField(
    list.__rules,
    name,
    value,
    language,
    accumulator,
    eachErrorBase,
  )

  if (Array.isArray(value) && value.length !== 0) {
    let hasError = false
    const errorsList = [] as Array<AnyObject | null>

    for (const [index, val] of value.entries()) {
      const errors = __validateSchema({
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
