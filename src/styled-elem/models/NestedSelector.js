export default class NestedSelector {
  constructor(selector, ruleSet) {
    this.selector = selector
    this.ruleSet = ruleSet
  }

  flatten() {
    const { selector } = this
    const { rules, fragments } = this.ruleSet.flatten()
    return { selector, rules, fragments }
  }
}
