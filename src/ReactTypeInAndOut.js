var React = require('react');

class ReactTypeInAndOut extends React.Component {

    constructor (props) {
        super(props);

        var words = props.words.slice();
        var start = 0;

        words = words.reduce((acc, word) => {

            // include empty string as start/end
            var charlist = [''].concat(word.split(''));

            var forwards = charlist.slice(0, -1).map((lc, lIdx, lw) => {
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

    startTyping (words) {
        var start = this.state.start;
        var running = setInterval(() => {

            var cursorAnimated = false;
            start = (start + 1) % words.length;

            // avoid getting inside this loop if no repeating delay is provided
            if (this.props.delayRestart > 0 && start === 0) {
                clearInterval(running);
                setTimeout(this.startTyping.bind(this, words), this.props.delayRestart);
                cursorAnimated = true;

            // delay when word is fully typed and will regress
            } else if (this.props.delayOnWordFinish && start >= 1 && words[start - 1] === words[start + 1]) {
                clearInterval(running);
                setTimeout(this.startTyping.bind(this, words), this.props.delayOnWordFinish);
                cursorAnimated = true;
            }

            // this is an important flag to avoid firing a setState when component is unmounted
            if (this._componentMounted) {
                this.setState({
                    currentWord: words[start],
                    start: start,
                    cursorAnimated: cursorAnimated
                });
            }

        }, this.props.speed);
    }

    componentWillUnmount () {
        this._componentMounted = false;
    }

    componentDidMount () {
        this._componentMounted = true;

        setTimeout(() => {
            this.startTyping(this.state.words);
        }, this.props.delayStart);
    }

    render () {
        var currentWord = this.state.currentWord;
        var className = this.props.className;
        var cursorClassName = className + '__icon';

        if (this.state.cursorAnimated) {
            cursorClassName = cursorClassName + ' ' + cursorClassName + '--animated';
        }

        return (
            <span className={className}>
              {currentWord}
              {this.props.showCursor && <span className={cursorClassName}>|</span>}
            </span>
        );
    }
}

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

export default ReactTypeInAndOut;
