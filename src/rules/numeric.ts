import { translations } from "../translations.js"
import { Rule } from "../types.js"

export const numeric: Rule = {
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
