import Element from './models/Element'
import Fragment from './models/Fragment'

/* Lower-case constructor helper functions */
const elem = Element
const fragment = (...args) => new Fragment(...args)
const nested = fragment

/* Wrap the base functions in objects and export*/
import * as rules from './rules'
import * as units from './units'

/* Higher-order constructors */
import concat from './constructors/concat'
import css from './constructors/css'
import rule from './constructors/rule'
import simple from './constructors/simple'
import toggle from './constructors/toggle'
import trait from './constructors/trait'
import media from './constructors/media'

export { elem, rule, rules, units, nested, concat, css, simple, toggle, trait, media }
