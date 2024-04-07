import {CYRILLIC_REGEXP, resetRegexpState, types} from '../utils.js'
import {translations} from '../translations.js'
import {Rule} from '../types.js'

export const noCyrillic: Rule<string> = {
  type: types.string,
  rule: 'noCyrillic',
  errorMessage: translations.noCyrillic,
  valid: text => {
    if (!text) {
      return false
    }

    resetRegexpState(CYRILLIC_REGEXP)
    return !CYRILLIC_REGEXP.test(String(text))
  },
}
