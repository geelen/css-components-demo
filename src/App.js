import React from 'react';
import { elem, rules, css, media, nested } from 'styled-components'
import { minHeight } from 'styled-components/lib/rules'
import { vh } from 'styled-components/lib/units'
import { backgrounds, typography } from './styles'

import Nav from './Nav'
import TweetDisplay from './TweetDisplay'

const App = elem(
  minHeight(vh(100)),
  backgrounds.blue,
  nested('#root > &',
    backgrounds.white
  )
)
const Main = elem('main', css`
  ${typography('sans')}
  max-width: 400px;
  margin: 0 auto;
  ${media('min-width: 600px', css`
    max-width: 600px;
  `)}
`)

export default () =>
  <App>
    <Nav/>
    <Main>
      <TweetDisplay/>
    </Main>
  </App>
