import elem from './elem'
import trait from './trait'
import RuleSet from './RuleSet'
import { Rule } from './css/utils'
import Fragment from './Fragment'

export { elem, trait, RuleSet, Rule, Fragment }
export const nested = (...args) => new Fragment(...args)

const css_regexp = /^\s*([\w-]+):\s+([^;]*);\s*$/
export const fromString = (strings, interpolations) => {
  const rules = new RuleSet()
  strings.forEach(str => str.split('\n').forEach(line => {
    const [_, property, value] = css_regexp.exec(line) || []
    if (property && value) rules.add(property, value)
  }))
  console.log(rules)
  return rules
}
