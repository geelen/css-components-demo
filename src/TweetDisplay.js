import React from 'react'
import { elem, css, rules, units } from './styled-elem'

const Outer = elem(css`
  margin: 0 auto;
  ${rules.padding(units.rem(4))}
  display: block;
  background: red;
`)
const Header = elem(css``)
const Profile = elem('img', css`
  display: block;
`)
const Name = elem(css``)
const Handle = elem(css``)
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
      <Profile src="https://pbs.twimg.com/profile_images/681114454029942784/PwhopfmU_reasonably_small.jpg"></Profile>
      <Name>Max Stoiber</Name>
      <Handle>@mxstbr</Handle>
    </Header>
    <Body>👏 Love love love this article by
      <InlineLink src="https://mobile.twitter.com/chantastic">@chantastic</InlineLink>.
      CSS-in-JS isn’t a campaign against CSS!
      <InlineLink src="https://t.co/P3QdkX88rs">medium.com/learnreact/sca…</InlineLink>
    </Body>
  </Outer>
