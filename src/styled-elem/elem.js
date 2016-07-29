import {createElement} from 'react'

import Fragment from './Fragment'

/* Either ['tagName', ...styles] or [...styles] can be passed in */
const ensureTagThenStyles = list =>
  typeof list[0] === 'string' ? list : ['div'].concat(list)

const elem = (...properties) => {
  const [tagName, ...styleFragments] = ensureTagThenStyles(properties)
  const outerFragment = Fragment(null, ...styleFragments)
  const className = outerFragment.injectStyles()

  /* Return a stateless functional component that simply renders
  * a HTML element with our styles applied. */
  return props => (
    createElement(tagName, Object.assign({}, props, {
      className: [props.className, className].join(' ')
    }))
  )
}

elem.span = elem.bind(null, 'span')

export default elem
