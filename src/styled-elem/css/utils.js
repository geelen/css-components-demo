import Rule from '../Rule'

const _throw = message => { throw new Error(message) }

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
  const validValues = () => `\nValid values are: ${JSON.stringify(definitions, null, 2)}`
  const flatDefinitions = {}
  Object.keys(definitions).forEach(category => {
    Object.keys(definitions[category]).forEach(option => {
      if (option === 'default') return
      if (flatDefinitions[option]) _throw(`Already have a definition for '${option}' as a '${flatDefinitions[option].category}!`)
      flatDefinitions[option] = { category, value: definitions[category][option] }
    })
  })
  return valueString => {
    const values = valueString.split(/ +/)
    const obj = {}
    values.forEach(v => {
      const { category, value } = flatDefinitions[v] || {}
      if (!category) _throw(`Unknown value '${v}' for ${name}. ${validValues()}`)
      obj[category] = value
    })
    Object.keys(definitions).forEach(category => {
      if (typeof obj[category] === 'undefined') obj[category] = definitions[category].default || _throw(`Not provided value for category '${category}' and no default specified for ${name}. ${validValues()}`)
    })
    return cb(obj)
  }
}
