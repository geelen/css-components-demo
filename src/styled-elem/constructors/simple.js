export default (property, ...shorthands) => {
  const constructor = value => new Rule(property, value)
  shorthands.forEach(v => constructor[v] = constructor(v))
  return constructor
}
