import {translations} from '../translations.js'
import {types} from '../utils.js'
import {Rule} from '../types.js'

export const requiredList: Rule<[]> = {
  type: types.array,
  rule: 'requiredList',
  errorMessage: translations.requiredList,
  valid: value => Array.isArray(value)
    ? value.length !== 0
    : false,
}
