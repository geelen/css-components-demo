import {createElement} from 'react'

import Fragment from './Fragment'

/* Either ['tagName', ...styles] or [...styles] can be passed in */
const ensureTagThenStyles = list =>
  typeof list[0] === 'string' ? list : ['div'].concat(list)

const Element = (...properties) => {
  const [tagName, ...styleFragments] = ensureTagThenStyles(properties)
  const outerFragment = new Fragment(null, ...styleFragments)
  const className = outerFragment.injectStyles()

  /* Return a stateless functional component that simply renders
  * a HTML element with our styles applied. */
  return props => (
    createElement(tagName, Object.assign({}, props, {
      className: [props.className, className].join(' ')
    }))
  )
}

export default Element
