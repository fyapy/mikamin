import { translations } from "../translations.js"
import { Rule } from "../types.js"

export const regExp = (regexp: RegExp): Rule => ({
  rule: 'regExp',
  errorMessage: translations.regExp,
  meta: {regexp},
  valid: value => {
    if (!value) {
      return false
    }

    return regexp.test(String(value))
  },
})

