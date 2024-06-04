import {Types, type Rule, type RuleType, type SkipRulesIf} from './types.js'
import {types} from './constants.js'

export const nullable = <R extends Rule[] | Rule, B = RuleType<R>>(rules: R): SkipRulesIf<B, null> => ({
  type: types.any,
  skipType: types.null,
  __type: Types.Skip,
  __skip: value => value === null,
  __rules: rules,
})

export const optional = <R extends Rule[] | Rule, B = RuleType<R>>(rules: R): SkipRulesIf<B, undefined> => ({
  type: types.any,
  skipType: types.undefined,
  __type: Types.Skip,
  __skip: value => typeof value === 'undefined',
  __rules: rules,
})
