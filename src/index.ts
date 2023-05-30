import type {
  Each,
  Rule,
  List,
  Schema,
  ExecuteRule,
  HandleSchema,
} from './types.js'
import { handleEach } from './each.js'
import { handleList } from './list.js'

export {inputHandler} from './fastify.js'
export {setTranslations, translations} from './translations.js'
export * from './skips.js'
export * from './types.js'

export {array} from './rules/array.js'
export {bool} from './rules/bool.js'
export {email} from './rules/email.js'
export {httpUrl} from './rules/httpUrl.js'
export {maxLength} from './rules/maxLength.js'
export {minLength} from './rules/minLength.js'
export {minMax} from './rules/minMax.js'
export {number} from './rules/number.js'
export {numeric} from './rules/numeric.js'
export {oneOf} from './rules/oneOf.js'
export {optinalArray} from './rules/optinalArray.js'
export {regExp} from './rules/regExp.js'
export {required} from './rules/required.js'
export {requiredList} from './rules/requiredList.js'
export {noCyrillic} from './rules/noCyrillic.js'
export {ip} from './rules/ip.js'
export {uuid} from './rules/uuid.js'

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

const executeRules: ExecuteRule = (
  fns,
  name,
  value,
  language,
  accumulator,
) => {
  if (!Array.isArray(fns)) {
    if (!fns.valid(value)) {
      accumulator[name] = fns.errorMessage?.[language]?.({
        name,
        value,
        meta: fns.meta ?? {},
      })
    }

    return
  }

  for (const fn of fns) {
    if (!fn.valid(value)) {
      accumulator[name] = fn.errorMessage?.[language]?.({
        name,
        value,
        meta: fn.meta ?? {},
      })
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
    const fns = schema[name]
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
