import React from 'react';
import { elem, Fragment } from './styled-elem'
import { background, height, fontWeight, padding, textAlign, display, vh, rem, textTransform, content } from './styled-elem/css'

const blueBg = background('blue')
const redBg = background('red')
const after = text => Fragment('&::after', content(`'${text}'`))

const App = elem(
  blueBg,
  height(vh(100)),
  Fragment('> span',
    fontWeight(600),
    padding(rem(4)),
    textAlign.center,
    display.block,
    after('?'),
    Fragment('&:hover',
      redBg,
      textTransform('uppercase'),
      after('!')
    )
  )
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
    <span>yeah</span>
    <Nav/>
    <Main/>
  </App>
