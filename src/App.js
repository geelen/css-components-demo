import React from 'react';
import styled from 'styled-components'
import { backgrounds, typography } from './styles'

import Nav from './Nav'
import TweetDisplay from './TweetDisplay'

const App = styled.div`
  min-height: 100vh;
  ${backgrounds.blue}
  #root > & {
    ${backgrounds.white}
  }
`

const Main = styled.main`
  ${typography('sans')}
  max-width: 400px;
  margin: 0 auto;
  @media (min-width: 600px) {
    max-width: 600px;
  }
`

export default () =>
  <App>
    <Nav/>
    <Main>
      <TweetDisplay/>
    </Main>
  </App>
