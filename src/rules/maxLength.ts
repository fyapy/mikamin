import {translations} from '../translations.js'
import {types} from '../utils.js'
import {Rule} from '../types.js'

export const maxLength = (max: number): Rule<number> => ({
  type: types.number,
  rule: 'maxLength',
  errorMessage: translations.maxLength,
  meta: {max},
  valid: text => {
    if (!text) {
      return false
    }
    if (typeof text === 'string' || Array.isArray(text)) {
      return text.length <= max
    }

    return false
  },
})
