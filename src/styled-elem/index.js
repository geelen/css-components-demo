import Element from './models/Element'
import RuleSet from './models/RuleSet'
import Fragment from './models/Fragment'

import * as rules from './rules'
import * as units from './units'

/* Lower-case constructor helper functions */
const elem = Element
const rule = (...args) => new RuleSet(...args)
const fragment = (...args) => new Fragment(...args)
const nested = fragment

export { elem, rule, rules, units, fragment, nested }
