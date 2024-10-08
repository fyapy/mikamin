import {
  type Rule,
  type List,
  type RuleType,
  type FieldType,
  type ExecuteRule,
  type HandleSchema,
  Types,
} from './types.js'
import {handleList} from './list.js'
import {types} from './constants.js'
import {logErrorUnsupportedLanguage} from './utils.js'
import {defaultLanguage} from './translations.js'

export {mikaminHandler} from './fastify.js'
export {mikaminStringify} from './stringify.js'
export {mikaminResolver} from './react-hook-form.js'
export {setTranslations, translations} from './translations.js'
export {enumValues} from './utils.js'
export * from './constants.js'
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
export {json, jsonString} from './rules/json.js'

export const list = <
  T extends List['__schema'],
  B = T extends Record<string, FieldType>
    ? {[K in keyof T]: RuleType<T[K]>}
    : RuleType<T>
>(obj: T, rules?: Rule[] | Rule): List<B[]> => ({
  type: types.any,
  __type: Types.List,
  __rules: rules,
  __schema: obj,
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
      || fns?.__type === Types.Skip
    ) {
      if (fns?.__type === Types.Skip) {
        if (!fns.__skip(value)) {
          executeRules(fns.__rules, name, value, language, accumulator)
        }
      } else {
        executeRules(fns, name, value, language, accumulator)
      }
    } else if (fns['__type'] === Types.List) {
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
