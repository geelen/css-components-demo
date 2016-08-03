import concat from "../constructors/concat"

/*
* The root node of a styling tree.
* */
export default class Root {
  constructor(...rules) {
    this.ruleSet = concat(...rules)
  }

  injectStyles() {
    const {rules, fragments} = this.ruleSet.flatten()
  }
}
