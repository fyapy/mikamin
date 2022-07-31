import type { AnyObject, ErrorFormater, Rule } from './types'

export const normalizeRules = (rules: Rule[] | Rule) => Array.isArray(rules)
  ? rules
  : [rules]

export function fileEachRule(
  rules: Rule[],
  name: string,
  value: any,
  formater: ErrorFormater,
) {
  for (const rule of rules) {
    if (rule.fire(value)) {
      return formater({
        rule: rule.rule,
        value,
        name,
        meta: rule.meta,
      })
    }
  }
}
export function handleArrayLikeField(
  rules: Rule[] | Rule | undefined,
  name: string,
  value: any,
  formater: ErrorFormater,
  accumulator: AnyObject,
  errorBase: AnyObject,
) {
  if (typeof rules === 'undefined') return

  const _rules = normalizeRules(rules)

  const errors = fileEachRule(_rules, name, value, formater)
  if (errors) {
    if (!accumulator[name]) {
      accumulator[name] = { ...errorBase }
    }

    accumulator[name].field = errors
  }
}
