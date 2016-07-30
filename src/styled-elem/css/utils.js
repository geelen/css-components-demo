import Rule from '../Rule'

/* The basic Rule constructor */
export const simple = (property, ...shorthands) => {
  const constructor = value => new Rule(property, value)
  shorthands.forEach(v => constructor[v] = constructor(v))
  return constructor
}

/* Simple string concat */
export const unit = u => value => `${value}${u}`

/* Sorta a trait thing */
export const complex = (name, cb) => valueString => {
  const values = valueString.split(/ +/)
  return cb(values.reduce((obj, v) => (obj[v] = true) && obj, {}))
}
