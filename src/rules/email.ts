import { translations } from "../translations.js"
import { Rule } from "../types.js"

const CYRILLIC_REGEXP = /[А-Яа-яёЁ]+/ig
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const resetRegexpState = (regexp: RegExp) => {
  regexp.lastIndex = -1
}

export const email: Rule = {
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
