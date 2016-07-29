import Rule from '../Rule'

/* The basic Rule constructor */
export const simple = property => value => new Rule(property, value)
