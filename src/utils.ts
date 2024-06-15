import type {AnyObject, Rule} from './types.js'
import {array} from './rules/array.js'

export const logErrorUnsupportedLanguage = (language: string) => {
  console.error(`Unsuppoerted language: ${language}`)
  return ''
}

export const normalizeRules = (rules: Rule[] | Rule) => Array.isArray(rules)
  ? rules
  : [rules]

export function fireEachRule(
  rules: Rule[],
  name: string,
  value: any,
  language: string,
) {
  for (const rule of rules) {
    if (!rule.valid(value)) {
      const message = rule.errorMessage?.[language]

      return typeof message === 'undefined'
        ? logErrorUnsupportedLanguage(language)
        : message({name, value,  meta: rule.meta ?? {}})
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
  const _rules = typeof rules === 'undefined'
    ? [array]
    : normalizeRules(rules)

  const errors = fireEachRule(_rules, name, value, language)
  if (errors) {
    if (!accumulator[name]) {
      accumulator[name] = {...errorBase}
    }

    accumulator[name].field = errors
  }
}

export const enumValues = <TEnum extends { [name: string]: any }>(
  value: TEnum,
  nullable = false
) => {
  const values = Object.values(value)
  const isNumiricEnum = values.some(val => typeof val === 'number')
  const output = isNumiricEnum
    ? values.filter(value => typeof value !== 'string')
    : values

  if (nullable) {
    output.push(null)
  }

  return output as number[]
}

export const CYRILLIC_REGEXP = /[А-Яа-яёЁ]+/ig
export const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const IP_REGEXP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
export const UUID_V4_REGEXP = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

export const resetRegexpState = (regexp: RegExp) => {
  regexp.lastIndex = -1
}
