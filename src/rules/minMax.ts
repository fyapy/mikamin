import { translations } from "../translations.js";
import { Rule } from "../types.js";

export const minMax = (min: number, max: number): Rule => ({
  rule: 'minMax',
  errorMessage: translations.minMax,
  meta: {min, max},
  valid: val => typeof val === 'number'
    ? true
    : (val >= min && val <= max),
})
