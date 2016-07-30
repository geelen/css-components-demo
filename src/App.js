import React from 'react';
import { elem } from './styled-elem'

import Nav from './Nav'
import { backgrounds, borders } from './styles'
import {minHeight, rem, height, vh} from "./styled-elem/css";

const App = elem(
  minHeight(vh(100)),
  backgrounds.white,
)

const Main = elem(

)

export default () =>
  <App>
    <Nav/>
    <Main/>
  </App>
