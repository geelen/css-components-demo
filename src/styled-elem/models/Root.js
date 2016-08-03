import concat from "../constructors/concat"
import {hashObject} from 'aphrodite/lib/util'
import {css as aphroditeInjectCss} from 'aphrodite/no-important'

const joinSelectors = (outer, inner) => {
  /* For the moment, just support & at the beginning */
  return `${outer}${inner.startsWith('&') ? inner.slice(1) : ' ' + inner}`
}

/* Recursive CSS injector */
const injectCss = (_name, _definition, _fragments) => {
  const className = aphroditeInjectCss({ _name, _definition })
  _fragments.forEach(({ selector, rules, fragments }) => {
    injectCss(joinSelectors(_name, selector), rules, fragments)
  })
  return className
}

/*
 * The root node of a styling tree.
 * */
export default class Root {
  constructor(...rules) {
    this.ruleSet = concat(...rules)
  }

  /* This is aphrodite-specifc but could be changed up */
  injectStyles() {
    const { rules, fragments } = this.ruleSet.flatten()
    const hash = '_' + hashObject({ rules, fragments })
    return injectCss(hash, rules, fragments)
  }
}
