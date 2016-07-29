import {createElement} from 'react'
import {StyleSheet, css} from 'aphrodite/no-important';

export default (...properties) => {
  const tagName = (typeof properties[0] === 'string') ? properties.shift() : 'div'
  var styles = StyleSheet.create({ [tagName]: Object.assign({}, ...properties) });
  return (props) => (
    createElement(tagName, Object.assign({}, props, {
      className: [props.className, css(styles[tagName])].join(' ')
    }), props.children)
  )
}
