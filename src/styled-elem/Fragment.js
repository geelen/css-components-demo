import {css} from 'aphrodite/no-important'
import {hashObject} from 'aphrodite/lib/util'
import RuleSet from './RuleSet'

let count = 0
class Fragment {
  constructor(selector, ...rulesOrSubFragments) {
    this.key = `_${count++}`
    this.selector = selector
    console.log("RULES")
    console.log(rulesOrSubFragments)
    this.rulesOrSubFragments = rulesOrSubFragments
  }

  injectStyles(context = null) {
    const rules = this.rulesOrSubFragments.filter(r => r instanceof RuleSet)
    const fragments = this.rulesOrSubFragments.filter(f => f instanceof Fragment)
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
      const key = `${context}${this.selector.startsWith('&') ? this.selector.slice(1) : ' ' + this.selector}`
      css({
        _name: key,
        _definition: styles
      })
      fragments.forEach(f => f.injectStyles(key))
    }

    // return Object.assign({}, ...this.rulesOrSubFragments.map(
    //   subfrag => typeof subfrag.toObject === 'function' ? subfrag.toObject() : subfrag
    // ))
  }
}

export default (...args) => new Fragment(...args)
