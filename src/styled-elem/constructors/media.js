import rule from "./rule"
import concat from "./concat"

export default (query, ...rules) => {
  /* Only support simple */
  console.log("MEDIA")
  console.log(rules)
  console.log(rule(`@media (${query})`, concat(rules).rules))
  return rule(`@media (${query})`, concat(rules).rules)
}
