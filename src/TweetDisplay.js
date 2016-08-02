import React from 'react'
import { elem, fromString, rule } from './styled-elem'
import { css } from './styles'

const Outer = elem(fromString`
  margin: 0 auto;
  ${rule.margin.rems(4)}
  display: block;
  background: red;
`)
const Header = elem(fromString``)
const Profile = elem(fromString``)
const Name = elem(fromString``)
const Handle = elem(fromString``)
const Body = elem(fromString``)
const InlineLink = elem(fromString``)

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
