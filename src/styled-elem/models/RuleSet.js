import Rule from "./Rule"
import MediaQuery from "./MediaQuery"
import NestedSelector from "./NestedSelector";
/*
* A RuleSet stores the leaf nodes that apply to some level
* of a styling tree, as well as any other children (fragments)
* */

export default class RuleSet {
  constructor(...rules) {
    this.rules = rules
  }

  add(...other) {
    other.forEach(r => {
      if (!r) return
      if (r instanceof RuleSet) this.rules.push(...r.rules)
      else if (r instanceof Rule) this.rules.push(r)
      else {
        console.error(r)
        throw new Error("Can't add this ^ to a RuleSet.")
      }
    })
    return this
  }

  flatten() {
    const rules = {}
    const fragments = []
    this.rules.forEach(r => {
      if (r instanceof Rule) {
        rules[r.property] = r.value
      } else if (r instanceof MediaQuery) {
        rules[r.fullQuery()] = r.flatten()
      } else if (r instanceof NestedSelector) {
        fragments.push(r.flatten())
      }
    })

    return { rules, fragments }
  }
}
