# CSS Components proposal

I'm calling this idea **Styled Elements** for the moment but want something catchier. It's got a few weird ideas in it, so bear with me.

## Weird Idea #1 — Generating Elements

Only a HTML element can actually be _rendered_ to the DOM, and thus only a _real HTML element_ can have styling. So, instead of using generic property-passing techniques like `className={x}` or `{...x}`, I propose something much more intertwined:

```jsx
import { elem } from 'styled-elem'

const Outer = elem('section', /* styles go here */)

export default (props) => (
  <Outer /* attributes as normal */>
    { /* children, too */ }
  </Outer>
)
```

That's functionally equivalent to this (which also works)

```jsx
import { generateClassnames } from 'styled-elem'

export default (props) => (
  <section /* attributes here */
           className={generateClassnames(/* styles here */)} />
    { /* children here */ }
  </section>
)
```

But to me, the separation of **STRUCTURE** and **STYLE** is better served by wrapping up the Element and the Style into a... wait for it... *Styled Element*.

Default tag is currently 'div', and I've thought about declaring aliases like `elem.section` and `elem.span`, but didn't really need it building the demo. The current implementation is in [Element.js](src/styled-elem/models/Element.js) and is pretty simple. But it works well for now!

## Weird Idea #2 — Modelling CSS Fragments

As far as I've seen, every CSS-in-JS approach opts for simple (maybe-nested) JS objects — sticking pretty close to the realities of working with inline styles. I don't think that's good enough to really make _styling code_ as malleable as I want. So instead of doing something like this:

```js
const styles = {
  background: 'papyawhip',
  color: 'peru',
  margin: '4rem'
}
```

I decided to go with a real [Rule](/src/styled-elem/models/Rule.js) and [RuleSet](/src/styled-elem/models/RuleSet.js) class, with a ton of helper methods for constructing them:

```js
import { concat, rules } from 'styled-elem'

const styles = concat(
  rules.background('papayawhip'),
  rules.color('peru'),
  rules.margin('4rem')
)
```

The advantage is how fluid these objects are. You can deconstruct `rules`:

```js
import { concat, rules } from 'styled-elem'
const { background, color, margin } = rules

const styles = concat(
  background('papayawhip'),
  color('peru'),
  margin('4rem')
)

/* or, if you're using elem the concat is implied: */
const Outer = elem('section',
  background('papayawhip'),
  color('peru'),
  margin('4rem')
)
```

...though that tends to be more trouble than it's worth. What's much better is when you **abstract the common rules away**:

```js
import { concat } from 'styled-elem'
import { backgrounds, colors, margins } from './styles'

const Outer = elem('section',
  backgrounds.light,
  colors.dark,
  margins.large
)
```

And then, since we have a proper data model of these styling fragments, we can **break the one-to-one mapping** of lines of code to lines of CSS:

```js
/* Probably in a shared file */
const darkOnLight = concat(
  backgrounds.light,
  colors.dark
)

/* Our component doesn't care that
   darkOnLight is actually 2 rules */
const Outer = elem('section',
  darkOnLight,
  margins.large
)
```

## Weird Idea #3 - Higher-Order Styles

Since you can fluidly generate & combine these styling fragments, you can start to encode more advanced concepts **as first-order elements of your design system**. I've built a few around the idea of a [`trait`](/src/styled-elem/constructors/trait.js):

```js
/* Shared file */
import { trait, rules } from 'styled-elem'

export const typography = trait('typography', {
  weight: {
     light: 300,
     bold: 500
  },
  size: {
    '24pt': '1.4rem',
    '18pt': '1.125rem',
    '16pt': '1rem'
  }
}, ({weight, size}) => concat(
  rules.fontWeight(weight),
  rules.fontSize(size)
))

/* Component file */
const Title = elem('h1',
  typography('24pt bold') // {font-weight: 500, font-size: 1.5rem;}
)
const Strapline = elem('h2',
  typography('18pt light') // {font-weight: 300, font-size: 1.125rem;}
)
```

This current `trait` implementation has been working pretty ok for me so far — you can also provide null defaults and optionally generate rules:

```js
export const typography = trait('typography', {
  weight: {
     light: 300,
     bold: 500,
     default: null
  },
  size: {
    '20pt': '1.25rem',
    '18pt': '1.125rem',
    '16pt': '1rem',
    default: null,
  }
}, ({weight, size}) => concat(
  weight && rules.fontWeight(weight),
  size && rules.fontSize(size)
))

// typography('') => {}
// typography('18pt') => {font-size: 1.125rem;}
// typography('bold') => {font-weight: 500;}
// typography('24pt light') => {font-weight: 500, font-size: 1.5rem;}
```

In fact, that became [common enough in my usage](src/styles.js#L51) that I ended up making the default callback work like that. It works well:

```js
import { rules } from 'styled-elem'
const { fontWeight, fontSize } = rules

export const typography = trait('typography', {
  weight: {
     light: fontWeight(300),
     bold: fontWeight(500),
     default: null
  },
  size: {
    '20pt': fontSize('1.25rem'),
    '18pt': fontSize('1.125rem'),
    '16pt': fontSize('1rem'),
    default: null
  }
})
```

I might make `default: null` implicit, not sure yet. Maybe a `trait` is a special case of a `namespace` higher-order-style property, I don't know yet. But this is neat so far.

## Weird Idea #4 — Support all of CSS

...at least as much as possible. I'm happy to propose a new abstraction on top of CSS as long as **you can fall back to CSS when you need to**. I'm talking about tag selectors, pseudo-selectors, descendant selectors, media queries, etc. So, I've defined a `nested` and `pseudo` function that take an initial argument and a list of `Rule`s and understand their place in the world:

```js
import { elem, rules, nested, psuedo } from 'styled-elem'
import { flex } from './styles'
const { flexGrow, borderBottom } = rules

const Nav = elem('nav',
  flex('align-center space-around'),
  nested('> *',
    flexGrow(1)
    pseudo('hover',
      borderBottom('1px solid')
    )
  )
)
```

I had to butcher Aphrodite to get this going but it _is_ going! I'm a big fan of direct-descendant selectors in particular, often you'll have a structure like:

```jsx
<ProfileImg>
  <img src="..." alt="..."/>
</ProfileImg>
```

I don't like to have to name _both_ the outer `div` (assuming you need it for layout purposes) and the inner `img`. I'd style it this like:

```js
import { elem, rules, nested } from 'styled-elem'

const ProfileImg = elem(
  rules.padding('0.5rem'),
  rules.marginRight('0.5rem'),
  nested('> img',
    rules.height('100%'),
    rules.width('auto')
  )
)
```

The good news is, as long as we're generating real CSS (no inline styles) with classnames (the way Aphrodite already does), we can do anything! Except, of course, generate fully-global CSS. But then just write CSS, obviously.

So we do. `Rule`s can be nested at any level, there are [`NestedSelector`](src/styled-elem/models/NestedSelector.js) and [`MediaQuery`](src/styled-elem/models/MediaQuery.js) classes, and they can be nested inside `RuleSet`s and have their own `RuleSet`s within. It's objects all the way down.

Why no `PseudoSelector` class, I hear you (maybe) ask? Well, read on!

## Weird Idea #5 — Support Actual CSS 😱

This is the big one. Credit has to go to [@charliesome](/charliesome) for this, too — I initially didn't quite get what he was saying, but I'm now 100% on board. Let's go back to the original example:

```js
import { elem, rules } from 'styled-elem'

const Outer = elem('section',
  background('papayawhip'),
  color('peru'),
  margin('4rem')
)
```

This can instead be written as:

```js
import { elem, css } from 'styled-elem'

const Outer = elem('section', css`
  background: papayawhip;
  color: peru;
  margin: 4rem;
`)
```

🎉 **TADA!** 🎉

Not convinced? Well let's see what we can do. Can we do normal, dumb-as-a-post string concatenation? Of course!

```js
import { bgColor, fgColor, spacingSize } from './styles'

const Outer = elem('section', css`
  background: ${bgColor};
  color: ${fgColor};
  margin: ${bigSpacing};
`)
```

But that's **booooring**. Normal string concatenation will do that, and we are _waaaaay_ beyond normal. Instead of replacing simple _values_, let's replace whole `Rule`s:

```js
import { backgrounds, margins } from './styles'

const Outer = elem('section', css`
  ${backgrounds.light}
  color: peru;
  ${margins.large}
`)
```

That's right. Instead of using a template string to convert _to_ a string, we're parsing the string parts into `Rule`s and combining them with our normal, JS-land stuff with `concat`. This let's us do some rad stuff:

```js
const bottomBorderOnHover = css`
  &:hover {
    ${borderBottom('1px solid')}
  )
`

const Nav = elem('nav', css`
  ${flex('align-center space-around')}
  > * {
    flex-grow: 1;
    ${bottomBorderOnHover}
  )
)
```

Note that we're jumping between all of these seamlessly:
* simple JS `Rule`s — `borderBottom('1px solid')`
* complex JS traits — `flex('align-center space-around')`
* Nested CSS selectors — `> * {}`
* Sass-like pseudo-selector declarations — `&:hover {}`
* Refactor chunks of style into a `RuleSet` using `css` — `bottomBorderOnHover`

![](https://66.media.tumblr.com/2d03084d38cf9ab4777427cfa111c0c1/tumblr_nmcdmkBK6y1tad71co1_400.gif)

And yet it works! See [TweetDisplay](src/TweetDisplay.js) and [FooterActions](src/FooterActions.js) for examples, then see it running at [css-components-demo.surge.sh/](https://css-components-demo.surge.sh/) (media queries work btw)

Because we have a solid base of _style fragments_ (represented by a `RuleSet`) we can basically do what we like. Which is great, because it means that _converting_ a project to use _Styled Elements_ (I really need a better name) might be really possible:

```js
import bootstrap from 'bootstrap'

const Root = elem(`css
	${bootstrap}
`)

export default ({children}) => (
  <Root>
    {children}
  </Root>
)
```

I haven't done this. I don't want to try. But, in effect, it would _preface_ every rule in Bootstrap with the generated class name for `Root` (i.e. based off the hash of its contents):

```css
/* generated */
._abc3156 h1 {}
._abc3156 .jumbotron {}
._abc3156 .lead {}
```

This effectively _quarantines_ global CSS off into its own little space. I'm really interested to explore this.

## Conclusion

So that's where I'm at. It just lives here, in this repo, and it's _really_ simply implemented. The list of things we would need to solve is _huge_:

### Dynamism

At the moment I've got no dynamic styles, nothing adding or removing depending on state. There are a lot of potential ways to do this, but nothing is grabbing me, yet. This is maybe the best way off the top of my head:

```js
const LikeButton = elem(css`
  color: ${grey};
  > svg {
    width: 30px;
    height: auto;
  }
`).when('clicked', css`
  color: ${red};
`)

export default ({state}) => (
	<LikeButton clicked={state.isClicked}>
	  <img src="..."/>
  </LikeButton>
)
```

But I haven't really thought it through. I do like the way that it uses the Element's API to pass properties, just the way you would a more complex component, and it does give an extra reason to use the `elem` constructor instead of manually setting the `className` property on normal React.DOM elements.

Right now, you could use `data-*` attrs or even global classes like `-is-clicked` to do the same thing.(`Element` will merge `className` at the call site with those that are generated):

```js
const LikeButton = elem(css`
  /* same as before */
  &[data-clicked] {
	  color: ${red};
  }
  /* or */
  &.-is-clicked {
    color: ${red};
  }
`)

export default ({state}) => (
	<LikeButton data-clicked={state.isClicked}
	  /* or: */ className={state.isClicked ? '-is-clicked' : ''}>
	  <img src="..."/>
  </LikeButton>
)
```

But I think there might be a better, more natural way to express conditional styles.

### Theming

Ok so this is the BIG big one. I feel like this is a solid porting of CSS information to a native JS structure, but unless than _enables_ something really powerful (like a solid solution to the idea of theming) then I don't know if it's really worth it. You may as well stick with CSS and wait for Custom Properties to land. Or rather, wait for Microsoft to land Custom Properties 😜

BUT DREAM WITH ME, friends. We could do something pretty straightforward like:

```js
const LikeButton = elem(theme => css`
  background: ${theme.bg || 'white'};
  color: ${theme.fg || 'black'};
  ${theme.define({fg: 'red'})} /* change theme as it is passed down to children */
`)
```

The element that it generates could then use React's `context` to pull a `theme` object out without needing to pass it down the whole tree. Or we could go crazy like:

```js
const LikeButton = elem(css`
  background: var(--bg, white);
  color: var(--fg, black);
  ${define(css`
	  --fg: red; /* passed to children of this element */
  `)}
`)
```

Because we're parsing the CSS, we could parse out the usage of variables, then combine that with the `context` trick above, we'd have a _pretty_ good approximation of true CSS variables. But we'd definitely have incompatibilities with the real syntax which might cause more confusion than it's worth.

I have a gut feel that there _is_ a good solution out there, but I haven't found it yet.

### Completion

There's just heaps of stuff in here that's not ready for real use yet. Such as:

- [ ] At the moment I'm just parsing the CSS line-by-line. Obviously we'd need a real lexer (we may have to write one, since the way the interpolations interplay with the literal strings is... complicated).
- [ ] There are two types of descendant selectors implemented, those that start with a `&` and those that don't. I used `&` because it's familiar from Sass but there are a lot of use cases we'd need to cover, and Aphrodite is hard enough to deal with already. Speaking of...
- [ ] Get rid of Aphrodite. Everything I've talked about is about the Problem Existing Between Keyboard And Chair of styling — i.e. the Developer Experience. How can we make styling easier to write, combine, refactor, port, maintain, publish, etc. There are some great things in Aphrodite, but the real JS Styling solution is going to need all the stuff in https://github.com/css-components/spec. I'm hoping nothing I've proposed prevents us from doing so.
- [ ] Performance, server-side rendering, etc. I'm not sure on the implications of my `Element` component wrapper yet. But if there's some fancy stuff to be done, like generating styles on `componentWillMount` and caching them or something, `Element` seems like a good place to put all that logic. That way, if we get it right, everyone wins without caring about the internals. Party times.
- [ ] API decisions. I don't mind `elem`, I quite like `css`, as names. `rules` and the way you have to deconstruct them is a pain. Maybe a babel plugin would help? Though tbh it's so easy to use `css` for anything literal and keep `rules` for when you're building higher-order-styling components. But `traits` API, etc, all up for grabs.
- [ ] Many more things. Oh so much.

---

Anyway, this _feels_ like a good first step in terms of developer experience (at least for me, the way I write CSS) so... yay?

<3