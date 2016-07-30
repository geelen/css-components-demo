import elem from './elem'
import trait from './trait'
import RuleSet from './RuleSet'
import { Rule } from './css/utils'
import Fragment from './Fragment'

export { elem, trait, RuleSet, Rule, Fragment }
export const nested = (...args) => new Fragment(...args)
