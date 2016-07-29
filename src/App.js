import React from 'react';
import { elem } from './styled-elem'
import { background, height } from './styled-elem/css'
//
// const App = elem(
//   Rule('background', 'blue'),
//   Rule('height', '100vh'),
//   Fragment('> span',
//     Rule('font-weight', 'bold')
//   ),
//   Rule('width', '100vw'),
//   Fragment('&:hover',
//     Rule('background', 'red')
//   )
// )

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
  <div style={{background: 'red', foo: 'bar'}}>
    <span>yeah?</span>
    <Nav/>
    <Main/>
  </div>
