import type { AnyObject, Rule } from './types'

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
      return rule.getError?.[language]?.({
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
