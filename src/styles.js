import { trait, Rule } from './styled-elem'
import { background } from './styled-elem/css'
import { options } from './styled-elem/css/utils'

export const grey = '#e1e8ed'
export const red = '#e53636'

export const backgrounds = {
  white: background('white')
}

export const borders = options('borders', {
  weight: {
    thick: '4px',
    medium: '2px',
    default: '1px'
  },
  color: {
    light: grey,
    red: red,
    default: 'black'
  },
  side: {
    left: 'borderLeft',
    top: 'borderTop',
    right: 'borderRight',
    bottom: 'borderBottom',
    default: 'border'
  },
  style: {
    dotted: 'dotted',
    default: 'solid'
  }
}, ({weight, color, style, side}) => {
  return Rule(side, `${weight} ${style} ${color}`)
})
