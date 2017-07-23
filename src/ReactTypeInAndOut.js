var React = require('react');

class ReactTypeInAndOut extends React.Component {

    constructor (props) {
        super(props);

        var words = props.words;

        words = words.reduce((acc, word) => {

            // include empty string as start/end
            var charlist = [''].concat(word.split(''));

            var forwards = charlist.slice(0, -1).map((lc, lIdx, lw) => {
                return lw.slice(0, lIdx + 1).join('');
            });

            var backwards = forwards.slice(1).reverse();

            return acc.concat(forwards, [word], backwards);

        }, []);

        this.state = {
            words: words,
            currentWord: words[0],
            start: 0,
            cursorAnimated: !!this.props.delayStart
        };
    }

    startTyping (words) {
        var start = this.state.start;
        var running = setInterval(() => {

            var cursorAnimated = false;
            start = (start + 1) % words.length;

            // avoid getting inside this loop if no repeating delay is provided
            if (this.props.delayRepeat > 0 && start === 0) {
                clearInterval(running);
                setTimeout(this.startTyping.bind(this, words), this.props.delayRepeat);
                cursorAnimated = true;

            // delay when word is fully typed and will regress
            } else if (this.props.delayOnWordFinish && start > 1 && words[start - 1] === words[start + 1]) {
                clearInterval(running);
                setTimeout(this.startTyping.bind(this, words), this.props.delayOnWordFinish);
                cursorAnimated = true;
            }

            this.setState({
                currentWord: words[start],
                start: start,
                cursorAnimated: cursorAnimated
            });

        }, this.props.speed);
    }

    componentDidMount () {
        setTimeout(() => {
            this.startTyping(this.state.words);
        }, this.props.delayStart);
    }

    render () {
        var currentWord = this.state.currentWord;
        var className = this.props.className;
        var cursorClassName = className + '__icon';

        if (this.state.cursorAnimated) {
            console.log('here??');
            cursorClassName = cursorClassName + ' ' + cursorClassName + '--animated';
        }
        console.log(cursorClassName);

        return (
            <span className={className}>
              {currentWord}
              {this.props.showCursor && <span className={cursorClassName}>|</span>}
            </span>
        );
    }
}

ReactTypeInAndOut.propTypes = {
    words: React.PropTypes.arrayOf(React.PropTypes.string),
    speed: React.PropTypes.number,
    delayRepeat: React.PropTypes.number,
    delayStart: React.PropTypes.number,
    delayOnWordFinish: React.PropTypes.number,
    showCursor: React.PropTypes.bool,
    className: React.PropTypes.string
};

ReactTypeInAndOut.defaultProps = {
    speed: 200,
    delayRepeat: 2000,
    delayStart: 0,
    delayOnWordFinish: 2000,
    showCursor: true,
    className: 'react-type-in-and-out'
};

export default ReactTypeInAndOut;
