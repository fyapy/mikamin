import {IP_REGEXP, resetRegexpState, types} from '../utils.js'
import {translations} from '../translations.js'
import {Rule} from '../types.js'

export const ip: Rule<string> = {
  type: types.string,
  rule: 'ip',
  errorMessage: translations.ip,
  valid: ip => {
    if (!ip) {
      return false
    }

    resetRegexpState(IP_REGEXP)
    return IP_REGEXP.test(String(ip).toLowerCase())
  },
}
