import React from 'react';
import { elem } from './styled-elem'
import { borders, css } from './styles'
const { height, rem } = css

const Nav = elem('nav',
  height(rem(3.3)),
  borders('bottom light')
)

export default () => (
  <Nav>

  </Nav>
)
