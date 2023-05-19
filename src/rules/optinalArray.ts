import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const optinalArray: Rule = {
  rule: 'optinalArray',
  errorMessage: translations.optinalArray,
  valid: value => typeof value === 'undefined'
    ? true
    : Array.isArray(value),
}
