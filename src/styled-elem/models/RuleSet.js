export default class RuleSet {
  constructor(rules = {}) {
    this.rules = rules
  }

  merge(other) {
    return new RuleSet(Object.assign({}, this.rules, other.rules))
  }

  add(property, value) {
    this.rules[property] = value
  }
}