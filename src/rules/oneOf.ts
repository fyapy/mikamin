import {translations} from '../translations.js'
import {enumValues} from '../utils.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const oneOf = <T>(oneOfValues: T | T[]): Rule<T> => {
  const values = !Array.isArray(oneOfValues)
    ? enumValues(oneOfValues as any)
    : oneOfValues

  return {
    type: types.any as T,
    rule: 'oneOf',
    errorMessage: translations.oneOf,
    meta: {values},
    valid: value => values.includes(value),
  }
}
