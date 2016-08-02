import React from 'react'
import { elem, css, rules, units } from './styled-elem'
import { flex, typography, borders } from './styles'

const Outer = elem(css`
  padding: 0 .6rem;
`)
const Header = elem(css`
  ${flex('align-stretch')}
  padding: 1rem 0 0.66rem;
`)
const Profile = elem(css`
  flex-grow: 1;
  flex-basis: 0;
  > img {
    width: 100%;
    ${borders('rounded')}
  }
`)
const Name = elem(css`
  flex-grow: 7;
  flex-basis: 0;
  margin-left: 0.5rem;
  > h1 {
    ${typography('bold lightBlack lh-normal')}
  }
  > h2 {
    ${typography('grey')}
  }
`)
const Body = elem(css``)
const InlineLink = elem('a', css`
  text-decoration: none;
  &:hover, &:active {
    text-decoration: underline;
  }
`)

export default () =>
  <Outer>
    <Header>
      <Profile>
        <img src="https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_reasonably_small.jpg" alt=""/>
      </Profile>
      <Name>
        <h1>Max Stoiber</h1>
        <h2>@mxstbr</h2>
      </Name>
    </Header>
    <Body>👏 Love love love this article by
      <InlineLink src="https://mobile.twitter.com/chantastic">@chantastic</InlineLink>.
      CSS-in-JS isn’t a campaign against CSS!
      <InlineLink src="https://t.co/P3QdkX88rs">medium.com/learnreact/sca…</InlineLink>
    </Body>
  </Outer>
