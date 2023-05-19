import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const array: Rule = {
  rule: 'array',
  errorMessage: translations.array,
  valid: value => Array.isArray(value),
}
