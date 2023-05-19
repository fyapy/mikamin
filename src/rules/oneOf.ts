import { translations } from "../translations.js"
import { Rule } from "../types.js"
import { enumValues } from "../utils.js"

export const oneOf = (oneOfValues: any[] | any): Rule => {
  const values = !Array.isArray(oneOfValues)
    ? enumValues(oneOfValues)
    : oneOfValues

  return {
    rule: 'oneOf',
    errorMessage: translations.oneOf,
    meta: {values},
    valid: value => values.includes(value),
  }
}
