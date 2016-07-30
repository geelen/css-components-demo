import elem from './elem'
import trait from './trait'
import _Rule from './Rule'
import _Fragment from './Fragment'

export { elem, trait }
export const Rule = (...args) => new _Rule(...args)
export const Fragment = (...args) => new _Fragment(...args)
