import Rule from '../Rule'

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
  const _throw = message => {
    throw new Error(`${message}\nValid values for '${name}' are: ${JSON.stringify(definitions, null, 2)}`)
  }
  const flatDefinitions = {}
  Object.keys(definitions).forEach(category => {
    Object.keys(definitions[category]).forEach(option => {
      if (option === 'default') return
      if (flatDefinitions[option]) _throw(`Already have a definition for '${option}' as a '${flatDefinitions[option].category}'!`)
      flatDefinitions[option] = { category, option, value: definitions[category][option] }
    })
  })
  return valueString => {
    const values = valueString.split(/ +/)
    const obj = {}
    values.forEach(v => {
      const definition = flatDefinitions[v]
      if (!definition) _throw(`Unknown value '${v}' for ${name}.`)
      const { category } = definition
      if (obj[category]) _throw(`More than one '${category} specified for ${name}: encountered '${v}' but already had seen '${obj[category].option}'.`)
      obj[category] = definition
    })
    Object.keys(definitions).forEach(category => {
      if (typeof obj[category] === 'undefined') {
        obj[category] = definitions[category].default || _throw(`Not provided value for category '${category}' and no default specified.`)
      } else {
        obj[category] = obj[category].value
      }
    })
    return cb(obj)
  }
}
