import RuleSet from "../models/RuleSet"

export default (property, value) => new RuleSet({[property]: value})
