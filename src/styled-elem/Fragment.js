import {StyleSheet, css} from 'aphrodite/no-important';
import Rule from './Rule'

let count = 0
class Fragment {
  constructor(selector, ...rulesOrSubFragments) {
    this.key = `_${count++}`
    this.selector = selector
    this.rulesOrSubFragments = rulesOrSubFragments
  }

  injectStyles(context = null) {
    const rules = this.rulesOrSubFragments.filter(r => r instanceof Rule)
    const fragments = this.rulesOrSubFragments.filter(f => f instanceof Fragment)
    if (!context) {
      /* We are the top level Fragment, proceed as normal */
      const styles = StyleSheet.create({
        [this.key]: Object.assign({}, ...rules.map(r => r.toObject()))
      })
      const className = css(styles[this.key]);
      fragments.forEach(f => f.injectStyles(className))
      return className
    } else {
      const key = `${this.key} span`
      css(StyleSheet.create({
        [key]: Object.assign({}, ...rules.map(r => r.toObject()))
      })[key])
    }

    // return Object.assign({}, ...this.rulesOrSubFragments.map(
    //   subfrag => typeof subfrag.toObject === 'function' ? subfrag.toObject() : subfrag
    // ))
  }
}

export default (...args) => new Fragment(...args)
