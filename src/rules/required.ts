import { translations } from "../translations.js"
import { Rule } from "../types.js"

export const required: Rule = {
  rule: 'required',
  errorMessage: translations.required,
  valid: value => {
    if (typeof value === 'string') {
      return value.trim() !== ''
    }
    if (Array.isArray(value)) {
      return value.length !== 0
    }

    return typeof value !== 'undefined' && value !== null
  },
}
