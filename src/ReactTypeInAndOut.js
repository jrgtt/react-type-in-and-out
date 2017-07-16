var React = require('react');

class ReactTypeInAndOut extends React.Component {

    constructor (props) {
        super(props);

        var words = props.words;

        words = words.reduce((acc, word) => {

            var forwards = word.split('').map((lc, lIdx, lw) => {
                return lw.slice(0, lIdx + 1).join('');
            });

            var backwards = forwards.slice(0, -1).reverse();

            return acc.concat(forwards, backwards);

        }, []);

        this.state = {
            words: words,
            currentWordIdx: 0
        };
    }

    componentDidMount () {
        var words = this.state.words;

        this.inter = setInterval(() => {
            var newIdx = (this.state.currentWordIdx + 1) % words.length;
            this.setState({
                currentWordIdx: newIdx
            });
        }, 200);
    }

    render () {
        var currentWord = this.state.words[this.state.currentWordIdx];

        return <div>{currentWord}</div>;
    }
}

ReactTypeInAndOut.propTypes = {
    words: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default ReactTypeInAndOut;
