export type GetRuleError = (params: {
  name: string
  value: any
  meta: Record<string, any>
}) => string
export interface Rule {
  // TODO
  priority?: number
  valid: (value: any) => boolean
  rule: string
  meta?: Record<string, any>
  errorMessage: Record<string, GetRuleError>
}

export type Translations = Record<string, Record<string, GetRuleError>>

export type SchemaField =
  | Rule
  | Rule[]
  | Each
  | List
  | SkipRulesIf

export type Schema<T = any> = T extends never
  ? any
  : {
    [K in keyof T]?: T[K] extends Array<string | number | boolean>
      ? Each
      : (T[K] extends Array<any>
        ? List<T[K]>
        : (T[K] extends Record<string, any>
          ? Schema<T[K]>
          : Rule | Rule[] | SkipRulesIf))
  }
export type StrictSchema<T = any> = T extends never
  ? any
  : {
    [K in keyof T]?: T[K] extends Array<string | number | boolean>
      ? Each
      : (T[K] extends Array<any>
        ? List<T[K]>
        : (T[K] extends Record<string, any>
          ? Schema<T[K]>
          : Rule | Rule[] | SkipRulesIf))
  }

export interface Each {
  __type: 'each'
  __eachRules: Rule[] | Rule
  __rules?: Rule[] | Rule
}
export interface List<T = any> {
  __type: 'list'
  __rules?: Rule[] | Rule
  __schema: Schema<T>
}
export interface SkipRulesIf {
  __type: 'skip'
  __skip: (value: any) => boolean
  __rules: Rule[] | Rule
}
export type AnyObject = Record<string, any>

export type ExecuteRule = (
  fns: Rule | Rule[],
  name: string,
  value: any,
  language: string,
  accumulator: AnyObject,
) => void
export type HandleSchema = <V = any>(
  props: {
    schema: Schema
    values: V
    language?: string
  },
  accumulator?: AnyObject,
) => AnyObject
