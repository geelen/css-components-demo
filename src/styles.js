import { trait, rule, rules, concat } from './styled-elem'

export const grey = '#e1e8ed'
export const darkGrey = '#8899a6'
export const blue = '#1da1f2'
export const red = '#e53636'

export const backgrounds = {
  white: rules.background('white')
}

export const borders = trait('borders', {
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
  return rule(side, `${weight} ${style} ${color}`)
})

export const flex = trait('flex', {
  direction: {
    vertical: rules.flexDirection('column'),
    default: null
  },
  display: {
    inline: rules.display('flex-inline'),
    default: rules.display('flex')
  },
  justify: {
    'space-around': rules.justifyContent('space-around'),
    'space-between': rules.justifyContent('space-between'),
    'justify-center': rules.justifyContent('center'),
    'justify-start': rules.justifyContent('flex-start'),
    'justify-end': rules.justifyContent('flex-end'),
    default: null
  },
  align: {
    'align-center': rules.alignItems('center'),
    'align-start': rules.alignItems('flex-start'),
    'align-end': rules.alignItems('flex-end'),
    default: null
  }
}, ({display, direction, justify}) => {
  return concat(display, direction, justify)
})
