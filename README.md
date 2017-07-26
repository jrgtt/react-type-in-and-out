# ReactTypeInAndOut

__Component to simulate the effect of typing in and typing out of a text__


## Demo & Examples

Live demo: [JRigotti.github.io/react-type-in-and-out](http://JRigotti.github.io/react-type-in-and-out/)

To try it locally: clone this repo, cd into it and build the examples with the following commands:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

You can get ReactTypeInAndOut from NPM and include it in your project with your build tool of preference (such as [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```
npm install react-type-in-and-out --save
```


## Usage

The minimal usage of this component can be done through passing a list of words you want to rotate. You can also control the typing speed, delays between words and a few otheroptions described in the properties section below.

```js
import ReactTypeInAndOut from 'react-type-in-and-out';

<ReactTypeInAndOut
    words{['React', 'type', 'in', 'and', 'out']}
/>
```

### Properties

| Property          | Type    | Default                 | Description                                |
|-------------------|---------|-------------------------|--------------------------------------------|
| words             | Array   | []                      | The list of words that are going to rotate |
| speed             | int     | 150                     | The typing speed of the text               |
| delayRestart      | int     | 0                       | The interval before the list starts again  |
| delayStart        | int     | 0                       | The delay before the typing starts         |
| delayOnWordFinish | int     | 0                       | The delay at the end of a fully typed word |
| showCursor        | boolean | true                    | Show cursor at the end of the text         |
| startFullWord     | boolean | false                   | Start component will full word displayed   |
| className         | string  | 'react-type-in-and-out' | The `class` attribute of the component     |


### Notes

* The cursor blinking effect is acquired though css, this project comes with an implementation which you can get at `src/ReactTypeInAndOut.css`
* `className + '__icon'` by default `'react-type-in-and-out__icon'` is the class of the icon
* `className + '__icon--animated'` by default `'react-type-in-and-out__icon--animated'` is an added class to the icon when the cursor starts blinking
* Speed and delay properties are all in milliseconds

## License

[MIT](./LICENSE) (c) 2017 Jean Rigotti.
