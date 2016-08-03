import concat from "../constructors/concat"
import {hashObject} from 'aphrodite/lib/util'

/*
* The root node of a styling tree.
* */
export default class Root {
  constructor(...rules) {
    this.ruleSet = concat(...rules)
  }

  /* This is aphrodite-specifc but could be changed up */
  injectStyles() {
    const {rules, fragments} = this.ruleSet.flatten()
    const hash = hashObject({rules, fragments})
    setTimeout(() => console.log(JSON.stringify({rules, fragments, hash}, null, 2)), 200)
  }
}
