import {Types, type Rule, type SkipRulesIf} from './types.js'
import {types} from './constants.js'

// or extends Rule | Rule[]
export const nullable = <R extends Rule>(rules: R): SkipRulesIf<R['type'], null> => ({
  type: types.any,
  skipType: types.null,
  __type: Types.Skip,
  __skip: value => value === null,
  __rules: rules,
})

// or extends Rule | Rule[]
export const optional = <R extends Rule>(rules: R): SkipRulesIf<R['type'], undefined> => ({
  type: types.any,
  skipType: types.undefined,
  __type: Types.Skip,
  __skip: value => typeof value === 'undefined',
  __rules: rules,
})
