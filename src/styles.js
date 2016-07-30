import { trait, Rule } from './styled-elem'
import * as css from './styled-elem/css'
export { css }
import { options, all } from './styled-elem/css/utils'

export const grey = '#e1e8ed'
export const darkGrey = '#8899a6'
export const blue = '#1da1f2'
export const red = '#e53636'

export const backgrounds = {
  white: css.background('white')
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

export const flex = options('flex', {
  direction: {
    vertical: css.flexDirection('column'),
    default: null
  },
  display: {
    inline: css.display('flex-inline'),
    default: css.display('flex')
  },
  justify: {
    'space-around': css.justifyContent('space-around'),
    'space-between': css.justifyContent('space-between'),
    'justify-center': css.justifyContent('center'),
    'justify-start': css.justifyContent('flex-start'),
    'justify-end': css.justifyContent('flex-end'),
    default: null
  },
  align: {
    'align-center': css.alignItems('center'),
    'align-start': css.alignItems('flex-start'),
    'align-end': css.alignItems('flex-end'),
    default: null
  }
}, ({display, direction, justify}) => {
  return all(display, direction, justify)
})
