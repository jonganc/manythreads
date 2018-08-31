---
title: Building a blog with Gatsby v2 and TypeScript
date: "2018-08-31T20:00:00.000Z"
---

I plan on using this blog to discuss web technologies that I find interesting.

My first topic is this web site itself.

I build this blog as a static site using:
1. [Gatsby](https://www.gatsbyjs.org/) v2 as a static generator
2. [TypeScript](https://www.typescriptlang.org/), as much as possible, because it's awesome and makes it so much easier to write working code
3. [Material UI](https://material-ui.com/) for layout, because I'm not a designer and it makes my life so much easier by giving me a bunch of widgets

The source is [here](https://github.com/jonganc/manythreads).

## TypeScript with Gatsby

Setting up TypeScript to hook into Gatsby is almost trivial. Merely install the `gatsby-plugin-typescript` module to your project and then add it to your `gatsby-config.js` file:

```javascript
{
  plugins: [
    `gatsby-plugin-typescript`,
  ]
}

```

## Using TypeScript with React

Gatsby is a [React](https://reactjs.org/) framework. It's a little tricky to get started using TypeScript with React because you have to figure out the appropriate typings for common object.

I mostly found myself mostly using function components. The appropriate typing is:

```typescript
interface Properties {
    key: string
}

const component: React.SFC<Properties> = props => (
  <div>{props.key}</div>
);
```

A full component is similar, but with an additional slots for `state` (as well as for `snapshot`, whatever that is...):

```typescript
interface Properties {
    propKey: string
}

interface State {
    stateKey: string
}

class Component extends React.Component<Properties, State> {
    constructor (props: Properties) {
        super(props);
        this.state = { stateKey: 'abc' }
    }

    render () {
        return (
            <div>{this.state.stateKey}:{this.props.propKey}
        )
    }
}
```

I'm not sure why we need to explicitly give the type for `props` but otherwise the type is `any`.

Honestly, that's mostly it for the TypeScript+React combination. 

## Material UI

Using TypeScript with Material UI is a bit trickier. The actual Material UI typings are good but it requires a little bit of fancy work to apply them in a type-safe way.

The principle complications emerge because of figuring out how to use Material UI's CSS solution. Material UI uses [JSS](https://github.com/cssinjs/jss) (a type of CSS-in-JavaScript) under the covers to generate component-specific CSS classes.

For example, suppose we want a list (I will use basic html `ul`, `li` elements, rather than Material UI's `List` component for simplicity) with a `Button`:

```html
<head>
  <style>
   .myContainer {
     display: flex;
     justify-content: center;
     /* ... */
   }
   /* ... */
  </style>
</head>
<body>
  <div class="myContainer">
    <ul class="myList">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
    <Button class="myButton">My Button</Button>
  </div>
</body>
```

The core of this construct would just be a React component with these elements:

```jsx
const myComponent = props => (
  <div>
    <ul>
      <li>Item 1</li>
      <li>Item 1</li>
    </ul>
    <Button>My Button</Button>
  </div>
);
```

Of course, this lacks both the styles and type-safety.

To add the styles, we merely wrap `myComponent` via a higher-order component `withStyles`, passing in a styles object. Thus:

```jsx
// myComponent.jsx

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center'
    /* ... */
  },
  /* ... */
}

const myComponent = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {/* ... */}
    </div>
  );
}

export default withStyles(styles)(myComponent)
```

As you can tell, withStyles adds an object called `classes` to the component's `props` with a key for the defined styles. We define the styles themselves as a plain old javascript object, with the CSS properties converted to camelCase so that we don't need to quote the names and the values are strings with the standard CSS values (or, if given as numbers, interpreted as pixels).

You can a lot of cool features with `styles` out of the box with Material UI, like nested styles or media queries. For example:
```javascript
const styles = {
  root: {
    '& a': {
      color: 'blue'
    }
  },
  '@media(min-width: 500px)': {
    root: {
      flex: 'display'
    }
  }
}

/* ... */
```

will get compiled into a style-sheet entry like

```html
<style>
  .myComponent-root-1 a {
    color: blue;
  }
  '@media(min-width: 500px) {
    .myComponent-root-1 {
      flex: display;
    }
  }
</style>
```

In fact, since Material UI ultimately just uses JSS, you can [add other JSS plugins to get virtually unlimited power](https://material-ui.com/customization/css-in-js/#plugins) (though I haven't actually tried this).

There's still one missing aspect, namely type-safety of the styles functionality. Material UI provides a helper function `createStyles` which behaves functionally (i.e. once it's compiled to JavaScript) as the identity function but which provides two areas of type safety:
- we get some type checking of CSS properties, so that a style like `{display: 0 }` is disallowed because the argument of `display` cannot be a length. Unfortunately, type checking of many/most property values ends up rather weak (this is [apparently a known issue in csstype](https://github.com/frenic/csstype/pull/22) that ultimately comes from the oddities of the CSS spec)
- the keys in the `classes` property match those given in `styles`.

We then use the helper `WithStyles` to add the appropriate `classes` properties to the component. Thus, the final product looks like:
```tsx
// myComponent.tsx

const styles = createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center'
    /* ... */
  },
  myList: {
    /* ... */
  },
  myButton: {
    /* ... */
  }
  /* ... */
})

const myComponent: React.SFC<
  WithStyles<typeof styles>
> = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ul className={classes.myList}>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <Button className={classes.myButton}>My Button</Button>
    </div>
  );
}

export default withStyles(styles)(myComponent)
```

## Server-side rendering

Getting server-side rendering working (i.e. so the initial page load from the server is an html file, then future page loads use js) was a bit of a pain. First of all, I had no experience with it. However, the example for Gatsby provided by material UI is a bit fragile and/or not yet fully set up Gatsby v2.

The idea 

## To improve

- I would like to use setup comments using something like [Staticman](https://staticman.net/).

- Some slightly improved styling, e.g. for inline code

## Conclusion

I'm rather happy with how this page turned out. Using React for more complicated page architecting and using markdown to write blog posts is quite an effective combination.
