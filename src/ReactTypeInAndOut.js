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
            currentWord: words[0]
        };
    }

    startTyping (words) {
        var start = 0;
        var running = setInterval(() => {

            start = (start + 1) % words.length;

            // avoid getting inside this loop if no repeating delay is provided
            if (this.props.delayRepeat > 0 && start === 0) {
                clearInterval(running);
                setTimeout(this.startTyping.bind(this, words), this.props.delayRepeat);
            }

            this.setState({
                currentWord: words[start]
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
        return <div>{currentWord}</div>;
    }
}

ReactTypeInAndOut.propTypes = {
    words: React.PropTypes.arrayOf(React.PropTypes.string),
    speed: React.PropTypes.number,
    delayRepeat: React.PropTypes.number,
    delayStart: React.PropTypes.number
};

ReactTypeInAndOut.defaultProps = {
    speed: 200,
    delayRepeat: 0,
    delayStart: 0
};

export default ReactTypeInAndOut;
