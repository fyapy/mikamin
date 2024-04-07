import type {
  Each,
  Rule,
  List,
  RuleType,
  ObjectRule,
  ExecuteRule,
  HandleSchema,
  FieldType,
} from './types.js'
import {handleEach} from './each.js'
import {handleList} from './list.js'
import {logErrorUnsupportedLanguage, types} from './utils.js'

export {inputHandler} from './fastify.js'
export {setTranslations, translations} from './translations.js'
export * from './skips.js'
export * from './types.js'

export {array} from './rules/array.js'
export {bool, boolStr} from './rules/bool.js'
export {email} from './rules/email.js'
export {httpUrl} from './rules/httpUrl.js'
export {maxLength} from './rules/maxLength.js'
export {minLength} from './rules/minLength.js'
export {minMax} from './rules/minMax.js'
export {number, stringNumber} from './rules/number.js'
export {oneOf} from './rules/oneOf.js'
export {optinalArray} from './rules/optinalArray.js'
export {regExp} from './rules/regExp.js'
export {string} from './rules/string.js'
export {requiredList} from './rules/requiredList.js'
export {noCyrillic} from './rules/noCyrillic.js'
export {ip} from './rules/ip.js'
export {uuid} from './rules/uuid.js'

export const object = <
  T extends Record<string, FieldType>
>(obj: T): ObjectRule<T> => ({
  __type: 'object',
  type: types.any,
  obj,
})

export const list = <
  T extends Record<string, Rule | Rule[] | ObjectRule | Each> = any,
  B = {
    [K in keyof T]: RuleType<T[K]>
  }
>(obj: T, rules?: Rule[] | Rule): List<B[]> => ({
  type: types.any,
  __type: 'list',
  __rules: rules,
  __schema: obj,
})

export const each = <
  T extends Rule[] | Rule,
  B = RuleType<T>
>(eachRules: T, rules?: Rule[] | Rule): Each<B> => ({
  type: types.any as B,
  __type: 'each',
  __rules: rules,
  __eachRules: eachRules,
})

const executeRules: ExecuteRule = (
  fns,
  name,
  value,
  language,
  accumulator,
) => {
  if (!Array.isArray(fns)) {
    if (!fns.valid(value)) {
      const message = fns.errorMessage?.[language]

      accumulator[name] = typeof message === 'undefined'
        ? logErrorUnsupportedLanguage(language)
        : message({name, value, meta: fns.meta ?? {}})
    }

    return
  }

  for (const fn of fns) {
    if (!fn.valid(value)) {
      const message = fn.errorMessage?.[language]

      accumulator[name] = typeof message === 'undefined'
        ? logErrorUnsupportedLanguage(language)
        : message({name, value, meta: fn.meta ?? {}})
      return
    }
  }
}

const defaultLanguage = 'en'
export const handleSchema: HandleSchema = (
  {
    schema,
    values,
    language = defaultLanguage,
  },
  accumulator = {},
) => {
  for (const name of Object.keys(schema)) {
    const fns = schema[name] as any
    const value = values[name]

    if (
      Array.isArray(fns)
      || typeof fns?.valid === 'function'
      || fns?.__type === 'skip'
    ) {
      if (fns?.__type === 'skip') {
        if (!fns.__skip(value)) {
          executeRules(fns.__rules, name, value, language, accumulator)
        }
      } else {
        executeRules(fns, name, value, language, accumulator)
      }
    } else if (fns['__type'] === 'each') {
      handleEach(fns, name, value, language, accumulator)
    } else if (fns['__type'] === 'list') {
      handleList(fns, name, value, language, accumulator, handleSchema)
    } else if (typeof fns === 'object') {
      // handle object
      const errors = handleSchema({
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
