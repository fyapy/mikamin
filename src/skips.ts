import {Types, type Rule, type SkipRulesIf} from './types.js'
import {types} from './constants.js'

// or extends Rule | Rule[]
export const nullable = <R extends Rule>(rules: R): SkipRulesIf<R['type'], null> => ({
  type: types.null,
  skipType: types.null,
  __type: Types.Skip,
  __skip: value => value === null,
  __rules: rules,
})

// or extends Rule | Rule[]
export const optional = <R extends Rule>(rules: R): SkipRulesIf<R['type'], undefined> => ({
  type: types.undefined,
  skipType: types.undefined,
  __type: Types.Skip,
  __skip: value => typeof value === 'undefined',
  __rules: rules,
})
