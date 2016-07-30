import React from 'react';
import { elem, Fragment } from './styled-elem'

import { backgrounds, borders } from './styles'
import {minHeight, rem, height, vh} from "./styled-elem/css";

const App = elem(
  minHeight(vh(100)),
  backgrounds.white,
)

const Nav = elem('nav',
  height(rem(3.3)),
  borders('bottom light')
)

const Main = elem(

)

export default () =>
  <App>
    <Nav/>
    <Main/>
  </App>
