import type {
  Each,
  Rule,
  List,
  Schema,
  FireRule,
  ValidateSchema,
} from './types'
import { handleEach } from './each'
import { handleList } from './list'

export * from './rules'
export * from './skips'
export * from './types'

export const list = <T extends any[] = any[]>(props: Schema<T[0]>, rules?: Rule[] | Rule): List => ({
  __type: 'list',
  __rules: rules,
  __schema: props,
})

export const each = (eachRules: Rule[] | Rule, rules?: Rule[] | Rule): Each => ({
  __type: 'each',
  __rules: rules,
  __eachRules: eachRules,
})

const fireRules: FireRule = (
  fns,
  name,
  value,
  language,
  accumulator,
) => {
  if (!Array.isArray(fns)) {
    if (fns.fire(value)) {
      accumulator[name] = fns.getError?.[language]?.({
        name,
        value,
        meta: fns.meta ?? {},
      })
    }

    return
  }

  for (const fn of fns) {
    if (fn.fire(value)) {
      accumulator[name] = fn.getError?.[language]?.({
        name,
        value,
        meta: fn.meta ?? {},
      })
      return
    }
  }
}

const defaultLanguage = 'en'
export const validateSchema: ValidateSchema = (
  {
    schema,
    values,
    language = defaultLanguage,
  },
  accumulator = {},
) => {
  for (const name of Object.keys(schema)) {
    const fns = schema[name]
    const value = values[name]

    if (
      Array.isArray(fns)
      || typeof fns?.fire === 'function'
      || fns?.__type === 'skip'
    ) {
      if (fns?.__type === 'skip') {
        if (!fns.__skip(value)) {
          fireRules(fns.__rules, name, value, language, accumulator)
        }
      } else {
        fireRules(fns, name, value, language, accumulator)
      }
    } else if (fns['__type'] === 'each') {
      handleEach(fns, name, value, language, accumulator)
    } else if (fns['__type'] === 'list') {
      handleList(fns, name, value, language, accumulator, validateSchema)
    } else if (typeof fns === 'object') {
      // handle object
      const errors = validateSchema({
        schema: fns,
        values: value || {},
        language,
      })

      if (Object.keys(errors).length !== 0) {
        accumulator[name] = errors
      }
    }
  }

  return accumulator
}
