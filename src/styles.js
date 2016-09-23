import {css, toggle} from 'styled-components'

export const lightGrey = '#e1e8ed'
export const grey = '#8899a6'
export const darkGrey = '#292f33'
export const blue = '#1da1f2'
export const red = '#e53636'

export const borders = {
  light: `1px solid ${lightGrey}`
}

export const backgrounds = {
  white: 'background: white;',
  blue: 'background: blue;'
}

export const flex = toggle('flex', {
  vertical: 'flex-direction: column',
  inline: 'display: flex-inline',
  default: 'display: flex',
  'space-around': 'justify-content: space-around',
  'space-between': 'justify-content: space-between',
  'justify-center': 'justify-content: center',
  'justify-start': 'justify-content: flex-start',
  'justify-end': 'justify-content: flex-end',
  'align-center': 'align-items: center',
  'align-start': 'align-items: flex-start',
  'align-end': 'align-items: flex-end',
  'align-stretch': 'alignItems: stretch',
})

export const typography = toggle('typography', {
  bold: 'font-weight: 700',
  light: 'font-weight: 300',
  darkGrey: `color: ${darkGrey}`,
  grey: `color: ${grey}`,
  blue: `color: ${blue}`,
  sans: `
      font-family: "Helvetica Neue,Helvetica,Arial,sans-serif";
      font-feature-settings: "kern" 1;
    `,
  '20pt': `font-size: 1.25rem;`,
  '14pt': `font-size: 0.85rem;`,
  'lh-normal': 'line-height: 1.3125rem',
  'lh-para': 'line-height: 1.5rem',
  upcase: 'text-transform: uppercase',
})

export const greyThenBlueOnHover = css`
  color: ${grey};
  &:hover {
    color: ${blue};
  }
`
