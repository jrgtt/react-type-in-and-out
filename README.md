# ReactTypeInAndOut

__Component to simulate the effect of typing in and typing out of a text__


## Demo & Examples

Live demo: [JRigotti.github.io/react-type-in-and-out](http://JRigotti.github.io/react-type-in-and-out/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-type-in-and-out is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-type-in-and-out.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-type-in-and-out --save
```


## Usage

__EXPLAIN USAGE HERE__

```
var ReactTypeInAndOut = require('react-type-in-and-out');

<ReactTypeInAndOut />
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


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

[MIT](./LICENSE) (c) 2017 Jean Rigotti.
