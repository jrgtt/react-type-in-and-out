'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var ReactTypeInAndOut = (function (_React$Component) {
    _inherits(ReactTypeInAndOut, _React$Component);

    function ReactTypeInAndOut(props) {
        _classCallCheck(this, ReactTypeInAndOut);

        _get(Object.getPrototypeOf(ReactTypeInAndOut.prototype), 'constructor', this).call(this, props);

        var words = props.words.slice();
        var start = 0;

        words = words.reduce(function (acc, word) {

            // include empty string as start/end
            var charlist = [''].concat(word.split(''));

            var forwards = charlist.slice(0, -1).map(function (lc, lIdx, lw) {
                return lw.slice(0, lIdx + 1).join('');
            });

            var backwards = forwards.slice(1).reverse();

            return acc.concat(forwards, [word], backwards);
        }, []);

        var currentWord = words[0];

        if (props.startFullWord) {
            currentWord = props.words.slice(0, 1)[0];
            start = words.indexOf(currentWord);
        }

        this.state = {
            words: words,
            currentWord: currentWord,
            start: start,
            cursorAnimated: !!this.props.delayStart
        };
    }

    _createClass(ReactTypeInAndOut, [{
        key: 'startTyping',
        value: function startTyping(words) {
            var _this = this;

            var start = this.state.start;
            var running = setInterval(function () {

                var cursorAnimated = false;
                start = (start + 1) % words.length;

                // avoid getting inside this loop if no repeating delay is provided
                if (_this.props.delayRestart > 0 && start === 0) {
                    clearInterval(running);
                    setTimeout(_this.startTyping.bind(_this, words), _this.props.delayRestart);
                    cursorAnimated = true;

                    // delay when word is fully typed and will regress
                } else if (_this.props.delayOnWordFinish && start >= 1 && words[start - 1] === words[start + 1]) {
                        clearInterval(running);
                        setTimeout(_this.startTyping.bind(_this, words), _this.props.delayOnWordFinish);
                        cursorAnimated = true;
                    }

                // this is an important flag to avoid firing a setState when component is unmounted
                if (_this._componentMounted) {
                    _this.setState({
                        currentWord: words[start],
                        start: start,
                        cursorAnimated: cursorAnimated
                    });
                }
            }, this.props.speed);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._componentMounted = false;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this._componentMounted = true;

            setTimeout(function () {
                _this2.startTyping(_this2.state.words);
            }, this.props.delayStart);
        }
    }, {
        key: 'render',
        value: function render() {
            var currentWord = this.state.currentWord;
            var className = this.props.className;
            var cursorClassName = className + '__icon';

            if (this.state.cursorAnimated) {
                cursorClassName = cursorClassName + ' ' + cursorClassName + '--animated';
            }

            return React.createElement(
                'span',
                { className: className },
                currentWord,
                this.props.showCursor && React.createElement(
                    'span',
                    { className: cursorClassName },
                    '|'
                )
            );
        }
    }]);

    return ReactTypeInAndOut;
})(React.Component);

ReactTypeInAndOut.propTypes = {
    className: React.PropTypes.string,
    delayOnWordFinish: React.PropTypes.number,
    delayRestart: React.PropTypes.number,
    delayStart: React.PropTypes.number,
    showCursor: React.PropTypes.bool,
    speed: React.PropTypes.number,
    startFullWord: React.PropTypes.bool,
    words: React.PropTypes.arrayOf(React.PropTypes.string)
};

ReactTypeInAndOut.defaultProps = {
    speed: 150,
    delayRestart: 0,
    delayStart: 0,
    delayOnWordFinish: 0,
    showCursor: true,
    className: 'react-type-in-and-out',
    startFullWord: false
};

exports['default'] = ReactTypeInAndOut;
module.exports = exports['default'];