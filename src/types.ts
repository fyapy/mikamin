export interface Rule {
  // TODO
  priority?: number
  fire: (value: any) => boolean
  rule: string
  meta?: Record<string, any>
}

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
export type ErrorFormater = (props: {
  rule: string
  name: string
  value: any
  meta?: Record<string, any>
}) => string

export type FireRule = (
  fns: Rule | Rule[],
  name: string,
  value: any,
  formater: ErrorFormater,
  accumulator: AnyObject,
) => void
export type ValidateSchema = <V = any>(
  props: {
    schema: Schema
    values: V
    formater?: ErrorFormater
  },
  accumulator?: AnyObject,
) => AnyObject
