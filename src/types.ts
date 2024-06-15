export type GetRuleError = (params: {
  name: string
  value: any
  meta: Record<string, any>
}) => string

export interface Rule<T = any> {
  type: T
  valid: (value: any) => boolean
  rule: string
  meta?: Record<string, any>
  errorMessage: Record<string, GetRuleError>
}

export type NormalizeRuleType<R extends Rule | Rule[]> = R extends Rule
  ? R['type']
  : R extends Array<infer Item extends Rule>
    ? Item['type']
    : never

export type RuleType<R extends FieldType> = R extends Rule
  ? R['type']
  : R extends Array<infer Item extends Rule>
    ? Item['type']
    : R extends SkipRulesIf
      ? R['skipType'] | R['type']
      : R extends ObjectRule
        ? {[K in keyof R]: RuleType<R[K]>}
        : R extends List<infer E>
          ? E
          : never

export interface ObjectRule extends Record<string, FieldType> {}

export type Infer<O extends ObjectRule, T = {[K in keyof O]: RuleType<O[K]>}> = {
  [K in keyof T]: T[K]
}

export type Translations = Record<string, Record<string, GetRuleError>>

export type FieldType = Rule | Rule[] | ObjectRule | List | SkipRulesIf

export enum Types {
  List = 'list',
  Skip = 'skip',
}

export interface List<T = any> {
  type: T
  __type: Types.List
  __rules?: Rule[] | Rule
  __schema: Record<string, FieldType> | Rule[] | Rule
}
export interface SkipRulesIf<T = any, S = any> {
  type: T
  skipType: S
  __type: Types.Skip
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

export type HandleSchema = (
  props: {
    schema: any // Record<string, FieldType>
    values: any
    language?: string
  },
  accumulator?: AnyObject,
) => AnyObject
