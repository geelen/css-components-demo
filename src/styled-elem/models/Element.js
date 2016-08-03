import {createElement} from 'react'

import Root from './Root'

/* Either ['tagName', ...styles] or [...styles] can be passed in */
const ensureTagThenStyles = list =>
  typeof list[0] === 'string' ? list : ['div'].concat(list)

const Element = (...properties) => {
  const [tagName, ...rules] = ensureTagThenStyles(properties)
  const outerFragment = new Root(...rules)
  /* Don't generate the styles now, only on render */
  let className

  /* Return a stateless functional component that simply renders
  * a HTML element with our styles applied. */
  return props => {
    if (!className) className = outerFragment.injectStyles()
    return createElement(tagName, Object.assign({}, props, {
      className: [props.className, className].join(' ')
    }))
  }
}

export default Element
