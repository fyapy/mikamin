import type {
  List,
  AnyObject,
  ErrorFormater,
  ValidateSchema,
} from './types'
import { handleArrayLikeField } from './utils'

const eachErrorBase = {
  __type: 'list',
}
export function handleList(
  list: List,
  name: string,
  value: any,
  formater: ErrorFormater,
  accumulator: AnyObject,
  __validateSchema: ValidateSchema,
) {
  handleArrayLikeField(
    list.__rules,
    name,
    value,
    formater,
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
        formater,
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
