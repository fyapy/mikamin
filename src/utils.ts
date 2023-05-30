import type { AnyObject, Rule } from './types.js'

export const normalizeRules = (rules: Rule[] | Rule) => Array.isArray(rules)
  ? rules
  : [rules]

export function fileEachRule(
  rules: Rule[],
  name: string,
  value: any,
  language: string,
) {
  for (const rule of rules) {
    if (!rule.valid(value)) {
      return rule.errorMessage?.[language]?.({
        name,
        value,
        meta: rule.meta ?? {},
      })
    }
  }
}
export function handleArrayLikeField(
  rules: Rule[] | Rule | undefined,
  name: string,
  value: any,
  language: string,
  accumulator: AnyObject,
  errorBase: AnyObject,
) {
  if (typeof rules === 'undefined') return

  const _rules = normalizeRules(rules)

  const errors = fileEachRule(_rules, name, value, language)
  if (errors) {
    if (!accumulator[name]) {
      accumulator[name] = { ...errorBase }
    }

    accumulator[name].field = errors
  }
}

export const enumValues = <TEnum extends { [name: string]: any }>(
  value: TEnum,
  nullable = false
) => {
  const output = Object.values(value).filter(
    (value) => typeof value !== "string"
  );

  if (nullable) {
    output.push(null);
  }

  return output as number[];
};

export const CYRILLIC_REGEXP = /[А-Яа-яёЁ]+/ig
export const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const IP_REGEXP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
export const UUID_V4_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

export const resetRegexpState = (regexp: RegExp) => {
  regexp.lastIndex = -1
}
