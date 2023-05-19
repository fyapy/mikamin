import { translations } from "../translations.js"
import { Rule } from "../types.js"

export const minLength = (min: number): Rule => ({
  rule: 'minLength',
  errorMessage: translations.minLength,
  meta: {min},
  valid: text => {
    if (!text) {
      return false
    }
    if (typeof text === 'string' || Array.isArray(text)) {
      return text.length >= min
    }

    return false
  },
})
