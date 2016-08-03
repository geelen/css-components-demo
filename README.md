# CSS Components proposal

I'm calling this idea **Styled Elements** for the moment but want something catchier. It's got a few weird ideas in it, so bear with me.

## Weird Idea #1 — Generating Elements

Only a HTML element can actually be _rendered_ to the DOM, and thus only a _real HTML element_ can have styling. So, instead of using generic property-passing techniques like `className={x}` or `{...x}` (which work great for components), I propose something much more intertwined:

```jsx
import { elem } from 'styled-elem'

const Outer = elem('section', /* styles */)

export default (props) => (
  <Outer attributes="as" normal>
    { /* children, too */ }
  </Outer>
)
```

That's functionally equivalent to this (which also works)

```jsx
import { generateClassnames } from 'styled-elem'

export default (props) => (
  <section attributes="as" normal
           className={generateClassnames(/* styles */)} />
    { /* children, too */ }
  </section>
)
```

But to me, the separation of **STRUCTURE** and **STYLE** is better served by wrapping up the Element and the Style into a... wait for it... *Styled Element*.

Default tag is currently 'div', and I've thought about declaring aliases like `elem.section` and `elem.span`, but didn't really need it building the demo. The current implementation is in [Element.js](src/styled-elem/models/Element.js) and is pretty simple. But it works well for now!

## Weird Idea #2 — Modelling CSS Fragments

As far as I've seen, every CSS-in-JS approach opts for simple (maybe-nested) JS objects — sticking pretty close to the realities of working with inline styles. I don't think that's good enough to really make _styling code_ (which is how I think about this approach) as malleable as I want. So instead of doing something like this:

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

/* or, if you're using elem: */
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

I might `default: null` implicit, not sure yet. Maybe a `trait` is a special case of a `namespace` higher-order-style property, I don't know yet. But this is neat so far.

## Weird Idea #4 — Support all of CSS

...at least as much as possible. I'm happy to propose a new abstraction on top of CSS as long as **you can fall back to CSS when you need to**. I'm talking about tag selectors, pseudo-selectors, descendant selectors, media queries, etc. So, pseudo selectors:

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

I had to butcher Aphrodite to get this going but it _is_ going! I'm a big fan of direct-descendant selectors, often you'll have a structure like:

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

But that's **booooring**. Normal string concatenation will do that, and we are _way_ beyond normal. Instead of replacing simple _values_, let's replace whole `Rule`s:

```js
import { backgrounds, colors, margins } from './styles'

const Outer = elem('section', css`
  ${backgrounds.light}
  ${colors.dark}
  ${margins.large}
`)
```

That's right. Instead of using a template string to convert _to_ a string, we're parsing the string parts into `Rule`s and combining them with our normal, JS-land stuff. This let's us do some rad stuff:

```js
const bottomBorderOnHover = css`
  &:hover {
    borderBottom('1px solid')
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

![](https://66.media.tumblr.com/2d03084d38cf9ab4777427cfa111c0c1/tumblr_nmcdmkBK6y1tad71co1_400.gif)

Because we have a solid base of _style fragments_ (represented by a `RuleSet`) we can 