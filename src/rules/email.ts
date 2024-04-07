import {CYRILLIC_REGEXP, EMAIL_REGEXP, resetRegexpState, types} from '../utils.js'
import {translations} from '../translations.js'
import {Rule} from '../types.js'

export const email: Rule<string> = {
  type: types.string,
  rule: 'email',
  errorMessage: translations.email,
  valid: email => {
    if (!email) {
      return false
    }
    const stringEmail = String(email)
    resetRegexpState(CYRILLIC_REGEXP)
    if (CYRILLIC_REGEXP.test(stringEmail)) {
      return false
    }

    resetRegexpState(EMAIL_REGEXP)
    return EMAIL_REGEXP.test(stringEmail.toLowerCase())
  },
}
