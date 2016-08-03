import camelize from 'fbjs/lib/camelizeStyleName'

import Fragment from "../models/Fragment"
import rule from "./rule"
import RuleSet from "../models/RuleSet";

const declaration = /^\s*([\w-]+):\s+([^;]*);\s*$/
const startNesting = /^\s*([\w\.:&>][^{]+)\{\s*$/
const stopNesting = /^\s*}\s*$/

export default (strings, ...interpolations) => {
  return new RuleSet()
  let currentFragment = new Fragment(null)
  const stack = [currentFragment]
  const linesAndInterpolations = strings[0].split('\n')
  interpolations.forEach((interp, i) => {
    /* Complex interpolation */
    if (interp instanceof Fragment || interp instanceof RuleSet) {
      linesAndInterpolations.push(interp)
      if (strings[i + 1]) linesAndInterpolations.push(...strings[i + 1].split('\n'))
      /* Simple (value) interpolation */
    } else {
      const lastStrIndex = linesAndInterpolations.length - 1
      linesAndInterpolations[lastStrIndex] = linesAndInterpolations[lastStrIndex] + interp + (strings[i + 1] || '')
    }
  })

  const pushNewFragment = newFragment => {
    /* Make our fragment a child of the current one*/
    currentFragment.push(newFragment)
    /* Pop our fragment on the stack */
    stack.push(newFragment)
    /* We're the new currentFragment */
    currentFragment = newFragment
  }

  const processLine = line => {
    const [_, subSelector] = startNesting.exec(line) || []
    const [__, property, value] = declaration.exec(line) || []
    const popNesting = stopNesting.exec(line)
    console.log({subSelector, property, value})

    /* ARE WE STARTING A NESTING? */
    if (subSelector) {
      pushNewFragment(new Fragment(subSelector))

      /* ARE WE A NORMAL RULE? */
    } else if (property && value) {
      const newRule = rule(camelize(property), value)
      console.log(newRule)
      currentFragment.add(newRule)
    } else if (popNesting) {
      stack.pop()
      currentFragment = stack[stack.length - 1]
    }
  }

  const processLineOrInterp = lineOrInterp => {
    console.log(lineOrInterp)
    if (typeof lineOrInterp === 'string') {
      processLine(lineOrInterp)
    } else if (lineOrInterp instanceof Fragment || lineOrInterp instanceof RuleSet) {
      currentFragment.add(lineOrInterp)
    }
  }

  linesAndInterpolations.forEach(processLineOrInterp)
  console.log(stack[0])
  return stack[0]
}
