import {translations} from '../translations.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const httpUrl: Rule<string> = {
  type: types.string,
  rule: 'httpUrl',
  errorMessage: translations.httpUrl,
  valid: value => {
    try {
      const url = new URL(value)

      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch (_) {
      return false
    }
  },
}
