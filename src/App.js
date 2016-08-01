import React from 'react';
import { elem } from './styled-elem'
import { backgrounds, borders } from './styles'
import {minHeight, rem, height, vh} from "./styled-elem/css";

import Nav from './Nav'
import TweetDisplay from './TweetDisplay'

const App = elem(
  minHeight(vh(100)),
  backgrounds.white,
)

const Main = elem(

)

export default () =>
  <App>
    <Nav/>
    <Main>
      <TweetDisplay/>
    </Main>
  </App>
