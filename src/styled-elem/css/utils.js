import RuleSet from '../RuleSet'
import camelize from 'fbjs/lib/camelizeStyleName'

export const Rule = (prop, val) => new RuleSet({ [prop]: val })

/* The basic Rule constructor */
export const simple = (property, ...shorthands) => {
  const constructor = value => new Rule(property, value)
  shorthands.forEach(v => constructor[v] = constructor(v))
  return constructor
}

/* Simple string concat */
export const unit = u => value => `${value}${u}`

/* Set a bunch of flags and call a callback */
export const toggles = (name, cb) => valueString => {
  const values = valueString.split(/ +/)
  const obj = {}
  values.forEach(v => obj[v] = true)
  return cb(obj)
}

/* Build up a set of options */
export const options = (name, definitions, cb) => {
  const flatDefinitions = {}
  const _throw = message => {
    throw new Error(`${message}\nValid values for '${name}' are:\n${Object.keys(flatDefinitions).join('\n')}`)
  }
  Object.keys(definitions).forEach(category => {
    Object.keys(definitions[category]).forEach(option => {
      if (option === 'default') return
      if (flatDefinitions[option]) _throw(`Already have a definition for '${option}' as a '${flatDefinitions[option].category}'!`)
      flatDefinitions[option] = { category, option, value: definitions[category][option] }
    })
  })
  return (valueString = '') => {
    const values = valueString.split(/ +/)
    const obj = {}
    values.filter(x => x).forEach(v => {
      const definition = flatDefinitions[v]
      if (!definition) _throw(`Unknown value '${v}' for ${name}.`)
      const { category } = definition
      if (obj[category]) _throw(`More than one '${category} specified for ${name}: encountered '${v}' but already had seen '${obj[category].option}'.`)
      obj[category] = definition
    })
    Object.keys(definitions).forEach(category => {
      if (typeof obj[category] === 'undefined') {
        if (typeof definitions[category].default === 'undefined') _throw(`No provided value for category '${category}' and no default specified.`)
        obj[category] = definitions[category].default
      } else {
        obj[category] = obj[category].value
      }
    })
    return cb(obj)
  }
}

export const all = (...rules) => rules.filter(r=>r)
  .reduce((set, r) => set.merge(r), new RuleSet())

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
