import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const requiredList: Rule = {
  rule: 'requiredList',
  errorMessage: translations.requiredList,
  valid: value => Array.isArray(value)
    ? value.length !== 0
    : false,
}
