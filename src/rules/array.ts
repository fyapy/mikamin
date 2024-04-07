import {translations} from '../translations.js'
import {types} from '../utils.js'
import {Rule} from '../types.js'

export const array: Rule<[]> = {
  type: types.array,
  rule: 'array',
  errorMessage: translations.array,
  valid: value => Array.isArray(value),
}
