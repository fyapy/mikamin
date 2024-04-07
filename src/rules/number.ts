import {translations} from '../translations.js'
import {types} from '../utils.js'
import {Rule} from '../types.js'

export const number: Rule<number> = {
  type: types.number,
  rule: 'number',
  errorMessage: translations.number,
  valid: value => typeof value === 'number',
}

export const stringNumber: Rule<string> = {
  type: types.string,
  rule: 'number',
  errorMessage: translations.number,
  valid: value => {
    if (value === null) {
      return false
    }
    if (typeof value === 'string' && value.length === 0) {
      return false
    }

    return !isNaN(Number(value))
  },
}
