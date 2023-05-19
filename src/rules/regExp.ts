import { translations } from "../translations.js"
import { resetRegexpState } from "../utils.js"
import { Rule } from "../types.js"

export const regExp = (regexp: RegExp): Rule => ({
  rule: 'regExp',
  errorMessage: translations.regExp,
  meta: {regexp},
  valid: value => {
    if (!value) {
      return false
    }

    resetRegexpState(regexp)
    return regexp.test(String(value))
  },
})

