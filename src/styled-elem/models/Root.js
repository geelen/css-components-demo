import concat from "../constructors/concat"
import {hashObject} from 'aphrodite/lib/util'
import {css as aphroditeInjectCss} from 'aphrodite/no-important'

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

/* Recursive CSS injector */
const injectCss = (_name, _definition, _fragments) => {
  const className = aphroditeInjectCss({ _name, _definition })
  _fragments.forEach(({ selector, rules, fragments }) => {
    joinSelectors(_name, selector).forEach(sub => {
      injectCss(sub, rules, fragments)
    })
  })
  return className
}

const joinSelectors = (outer, inner) => {
  /* split on commas (really simplistically) */
  return inner.split(/\s*,\s*/).map(subInner =>
    /* For the moment, just support & at the beginning */
    `${outer}${subInner.startsWith('&') ? subInner.slice(1) : ' ' + subInner}`.replace(/\s+$/,'')
  )
}
