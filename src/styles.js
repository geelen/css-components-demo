import { trait } from './styled-elem'
import { background, border, borderBottom } from './styled-elem/css'
import { complex } from './styled-elem/css/utils'

export const grey = '#e1e8ed'

export const backgrounds = {
  white: background('white')
}

export const borders = complex('borders', values => {
  const weight = values.thick ? '4px' : values.medium ? '2px' : '1px'
  const color = values.light ? grey : 'black'
  const style = values.dotted ? 'dotted' : 'solid'
  const side = values.bottom ? borderBottom : border
  return side(`${weight} ${style} ${color}`)
})
