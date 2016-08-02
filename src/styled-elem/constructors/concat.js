import RuleSet from "../models/RuleSet"

export default (...rules) => rules.filter(r=>r)
  .reduce((set, r) => set.merge(r), new RuleSet())
