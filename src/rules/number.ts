import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const number: Rule = {
  rule: 'number',
  errorMessage: translations.number,
  valid: value => typeof value === 'number',
}
