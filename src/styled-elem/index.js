import elem from './elem'
import _Rule from './Rule'
import _Fragment from './Fragment'

export { elem }
export const Rule = (...args) => new _Rule(...args)
export const Fragment = (...args) => new _Fragment(...args)
