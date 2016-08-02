import {css} from 'aphrodite/no-important'
import {hashObject} from 'aphrodite/lib/util'
import RuleSet from './RuleSet'

let count = 0
export default class Fragment {
  constructor(selector, ...rulesOrSubFragments) {
    this.key = `_${count++}`
    this.selector = selector
    this.rulesOrSubFragments = rulesOrSubFragments
  }

  push(ruleOrSubFragment) {
    this.rulesOrSubFragments.push(ruleOrSubFragment)
  }

  injectStyles(context = null) {
    /* First, flatten */
    const all = []
    this.rulesOrSubFragments.forEach(f => {
      if (f instanceof Fragment && f.selector === null) {
        all.push(...f.rulesOrSubFragments)
      } else {
        all.push(f)
      }
    })

    const rules = all.filter(r => r instanceof RuleSet)
    const fragments = all.filter(f => f instanceof Fragment)
    const styles = rules.reduce((set, r) => set.merge(r), new RuleSet()).rules
    if (!context) {
      /* We are the top level Fragment, proceed as normal */
      console.log(styles)
      const className = css({
        _name: this.key+'_'+hashObject(styles),
        _definition: styles
      });
      fragments.forEach(f => f.injectStyles(className))
      return className
    } else {
      this.selector.split(/\s*,\s*/).forEach(selector => {
        const key = `${context}${selector.startsWith('&') ? selector.slice(1) : ' ' + selector}`
        css({
          _name: key,
          _definition: styles
        })
        fragments.forEach(f => f.injectStyles(key))
      })
    }
  }
}
