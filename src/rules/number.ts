import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const number: Rule = {
  rule: 'number',
  errorMessage: translations.number,
  valid: value => typeof value === 'number',
}

export const numberStr: Rule = {
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
