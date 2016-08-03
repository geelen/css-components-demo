import React from 'react';
import { elem, rules, css, media, nested } from './styled-elem'
import { minHeight } from './styled-elem/rules'
import { vh } from './styled-elem/units'
import { backgrounds, typography } from './styles'

import Nav from './Nav'
import TweetDisplay from './TweetDisplay'

const A = elem(
  rules.backgroundColor('blue'),
  nested('> .what',
    rules.backgroundColor('red'),
  )
)
const B = elem(
  rules.backgroundColor('blue'),
  nested('> .what',
    rules.backgroundColor('blue'),
  )
)
const App = elem(
  minHeight(vh(100)),
  backgrounds.white
)
//
// const Main = elem('main', css`
//   ${typography('sans')}
//   max-width: 400px;
//   margin: 0 auto;
//   ${media('min-width: 600px)', css`
//     max-width: 600px;
//   `)}
// `)

export default () =>
  <App>
    <A/>
    <B/>
  </App>
