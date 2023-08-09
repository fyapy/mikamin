import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const bool: Rule = {
  rule: 'bool',
  errorMessage: translations.bool,
  valid: value => typeof value === 'boolean',
}

export const boolStr: Rule = {
  rule: 'bool',
  errorMessage: translations.bool,
  valid: value => value === 'true' || value === 'false',
}
