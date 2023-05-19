import type { Rule, SkipRulesIf } from './types.js'

type SkipFn = (rules: Rule[] | Rule) => SkipRulesIf

export const nullable: SkipFn = rules => ({
  __type: 'skip',
  __skip: value => value === null,
  __rules: rules,
})
export const optional: SkipFn = rules => ({
  __type: 'skip',
  __skip: value => typeof value === 'undefined',
  __rules: rules,
})

type PipeSkips = (...args: SkipFn[]) => (rules: Rule[] | Rule) => SkipRulesIf
export const pipeSkips: PipeSkips = (...skips) => rules => {
  const compitedSkipIfs = skips.reduce<SkipRulesIf[]>((acc, skip) => {
    acc.push(skip(rules))
    return acc
  }, [])

  const __skip: SkipRulesIf['__skip'] = value => {
    for (const skip of compitedSkipIfs) {
      if (skip.__skip(value)) {
        return true
      }
    }

    return false
  }

  return {
    __type: 'skip',
    __skip,
    __rules: rules,
  }
}
