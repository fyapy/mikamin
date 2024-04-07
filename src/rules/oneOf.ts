import {translations} from '../translations.js'
import {enumValues, types} from '../utils.js'
import {Rule} from '../types.js'

export const oneOf = <T>(oneOfValues: any[] | any): Rule<T> => {
  const values = !Array.isArray(oneOfValues)
    ? enumValues(oneOfValues)
    : oneOfValues

  return {
    type: types.any as T,
    rule: 'oneOf',
    errorMessage: translations.oneOf,
    meta: {values},
    valid: value => values.includes(value),
  }
}
