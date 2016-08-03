import {createElement} from 'react'

import Root from './Root'

/* Either ['tagName', ...styles] or [...styles] can be passed in */
const ensureTagThenStyles = list =>
  typeof list[0] === 'string' ? list : ['div'].concat(list)

const Element = (...properties) => {
  const [tagName, ...rules] = ensureTagThenStyles(properties)
  const outerFragment = new Root(...rules)
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
