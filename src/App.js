import React from 'react';
import { elem, rules, css } from './styled-elem'
import { minHeight } from './styled-elem/rules'
import { backgrounds } from './styles'

import Nav from './Nav'
import TweetDisplay from './TweetDisplay'

const App = elem(
  rules.minHeight.vh(100),
  backgrounds.white
)

const Main = elem('main', css`
  display: block;
`)

export default () =>
  <App>
    <Nav/>
    <Main>
      <TweetDisplay/>
    </Main>
  </App>
