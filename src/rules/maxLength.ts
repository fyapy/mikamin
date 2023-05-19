import { translations } from "../translations.js"
import { Rule } from "../types.js"

export const maxLength = (max: number): Rule => ({
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
