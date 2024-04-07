import {translations} from '../translations.js'
import {types} from '../utils.js'
import {Rule} from '../types.js'

export const optinalArray: Rule<undefined> = {
  type: types.undefined,
  rule: 'optinalArray',
  errorMessage: translations.optinalArray,
  valid: value => typeof value === 'undefined'
    ? true
    : Array.isArray(value),
}
