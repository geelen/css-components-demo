import React from 'react';
import { elem, Fragment, Rule } from './styled-elem'

const App = elem(
  Rule('background', 'blue'),
  Rule('height', '100vh'),
  Fragment('> span',
    Rule('font-weight', 'bold')
  ),
  Rule('width', '100vw'),
)

/*
background: blue;
height: 100vh;
& > span {
  font-weight: bold;
}
*/

const Nav = elem(

)

const Main = elem(

)

export default () =>
  <App>
    <span>yeah?</span>
    <Nav/>
    <Main/>
  </App>
