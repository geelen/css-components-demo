import { trait, rule, rules, concat } from './styled-elem'
const {flexDirection, fontWeight, alignItems, justifyContent, background, color, display, fontFamily, fontFeatureSettings, lineHeight, fontSize, textTransform } = rules

export const lightGrey = '#e1e8ed'
export const grey = '#8899a6'
export const darkGrey = '#292f33'
export const blue = '#1da1f2'
export const red = '#e53636'

export const backgrounds = {
  white: background('white')
}

export const borders = trait('borders', {
  weight: {
    thick: '4px',
    medium: '2px',
    default: '1px'
  },
  color: {
    light: lightGrey,
    red: red,
    default: 'black'
  },
  side: {
    left: 'borderLeft',
    top: 'borderTop',
    right: 'borderRight',
    bottom: 'borderBottom',
    all: 'border',
    default: null
  },
  style: {
    dotted: 'dotted',
    default: 'solid'
  },
  rounded: {
    rounded: 'borderRadius',
    default: null
  },
  radius: {
    default: '0.35rem'
  }
}, ({weight, color, style, side, rounded, radius}) => {
  return concat(
    side && rule(side, `${weight} ${style} ${color}`),
    rounded && rule(rounded, radius)
  )
})

export const flex = trait('flex', {
  direction: {
    vertical: flexDirection('column'),
    default: null
  },
  display: {
    inline: display('flex-inline'),
    default: display('flex')
  },
  justify: {
    'space-around': justifyContent('space-around'),
    'space-between': justifyContent('space-between'),
    'justify-center': justifyContent('center'),
    'justify-start': justifyContent('flex-start'),
    'justify-end': justifyContent('flex-end'),
    default: null
  },
  align: {
    'align-center': alignItems('center'),
    'align-start': alignItems('flex-start'),
    'align-end': alignItems('flex-end'),
    'align-stretch': alignItems('stretch'),
    default: null
  }
})

export const typography = trait('typography', {
  weight: {
    bold: fontWeight(700),
    light: fontWeight(300),
    default: null
  },
  color: {
    default: null,
    darkGrey: color(darkGrey),
    grey: color(grey),
    blue: color(blue)
  },
  typeface: {
    sans: concat(
      fontFamily("Helvetica Neue,Helvetica,Arial,sans-serif"),
      fontFeatureSettings('"kern" 1')
    ),
    default: null
  },
  fontSize: {
    '20pt': fontSize('1.25rem'),
    '14pt': fontSize('0.85rem'),
    default: null
  },
  lineHeight: {
    'lh-normal': lineHeight('1.3125rem'),
    'lh-para': lineHeight('1.5em'),
    default: null
  },
  case: {
    upcase: textTransform('uppercase'),
    default: null
  }
})
