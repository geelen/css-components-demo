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
  typography('20pt bold')
)
const Strapline = elem('h2',
  typography('18pt light')
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

In fact, that became [common enough in my usage](/src/styled-elem/styles.js) that I ended up simplifying to:

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

I might `default: null` implicit, not sure yet. As it stands I do a bunch of param-checking on the values you pass in, which is nice, but I want to balance that with how easy these are to create for common styling concerns.