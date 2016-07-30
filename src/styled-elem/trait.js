class Trait {
  constructor(name) {
    this.name = name
    this.matches = []
  }

  match(matcher, rule) {
    const matcherFunc = matcher instanceof RegExp
      ? matcher.exec.bind(matcher)
      : trait => trait === matcher

    const outputRule = typeof rule === 'function'
      ? rule
      : () => rule

    this.matches.push({ matcher, matcherFunc, outputRule })
    return this
  }

  createRules(args) {
    const traits = args.split(/ +/)
    return traits.map(trait => {
      const match = this.matches.find(m => m.matcherFunc(trait))
      if (match) {
        return match.outputRule(trait)
      } else {
        console.error(`Unmatched ${this.name} property ${trait}. Valid values: ${traits.map(t => t.matcher).join(' ')}`)
      }
    }).filter(x => x)
  }
}

export default name => {
  return new Trait(name)
}
