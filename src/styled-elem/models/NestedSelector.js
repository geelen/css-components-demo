export default class NestedSelector {
  constructor(selector, ruleSet) {
    this.selector = selector
    this.ruleSet = ruleSet
  }

  flatten() {
    const { selector } = this
    const { rules, fragments } = this
    return { selector, rules, fragments }
  }
}
