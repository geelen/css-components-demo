import React from 'react'
import {elem, css, rules, units} from './styled-elem'
import {flex, typography, borders, grey} from './styles'
import FooterActions from './FooterActions'

const Outer = elem(css`
  padding: 0 .6rem;
  ${typography('darkGrey')}
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
    ${typography('bold lh-normal')}
  }
  > h2 {
    ${typography('grey')}
  }
`)

const Body = elem(css`
  padding: 0.66rem 0;
  ${typography('20pt light lh-para')}
`)

const InlineLink = elem('a', css`
  ${typography('blue')}
  text-decoration: none;
  &:hover, &:active {
    text-decoration: underline;
    body & {
      border-bottom: none;
      html & {
        background: none;
      }
    }
  }
`)

const Media = elem(css`
  margin: 1rem 0;
  > img {
    max-width: 100%;
    ${borders('all light')}
  }
`)

const Timestamp = elem('datetime', css`
  color: ${grey};
`)

const TootCount = elem(css`
  ${borders('top light')}
  ${typography('upcase bold')}
  margin-top: 1rem;
  padding: 1.33rem 0;
  > small {
    ${typography('14pt light grey')}
  }
  > small:first-child {
    margin-right: 2rem;
  }
`)

export default () => (
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
    <Body>👏 Love love love this article
      by <InlineLink src="https://mobile.twitter.com/chantastic">@chantastic</InlineLink>.
      CSS-in-JS isn’t a campaign against
      CSS! <InlineLink src="https://t.co/P3QdkX88rs">medium.com/learnreact/sca…</InlineLink>
    </Body>
    <Media>
      <img src="https://pbs.twimg.com/media/CnwCr-nW8AAcQeZ.jpg" alt=""/>
    </Media>
    <Timestamp>Jul 20, 2016, 5:17 AM</Timestamp>
    <TootCount>
      32 <small>retweets</small>
      79 <small>likes</small>
    </TootCount>
    <FooterActions/>
  </Outer>
)
