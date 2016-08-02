import camelize from 'fbjs/lib/camelizeStyleName'

import RuleSet from '../models/RuleSet'

const css_regexp = /^\s*([\w-]+):\s+([^;]*);\s*$/
export const fromString = (strings, ...interpolations) => {
  const rules = new RuleSet()
  strings.forEach(str => str.split('\n').forEach(line => {
    const [_, property, value] = css_regexp.exec(line) || []
    if (property && value) rules.add(camelize(property), value)
  }))
  return interpolations
    .filter(r => r instanceof RuleSet)
    .reduce((rules, r) => rules.merge(r), rules)
}
