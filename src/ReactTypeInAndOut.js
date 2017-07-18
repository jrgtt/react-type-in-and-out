var React = require('react');

class ReactTypeInAndOut extends React.Component {

    constructor (props) {
        super(props);

        var words = props.words;

        words = words.reduce((acc, word) => {

            // include empty string as start/end
            word = [''].concat(word.split(''));

            var forwards = word.map((lc, lIdx, lw) => {
                return lw.slice(0, lIdx + 1).join('');
            });

            var backwards = forwards.slice(0, -1).reverse();

            return acc.concat(forwards, backwards);

        }, []);

        this.state = {
            words: words
        };
    }

    componentDidMount () {
        var words = this.state.words;

        words.reduce((acc, word) => {

            return acc.then(() => {

                return new Promise((resolve) => {

                    setTimeout(() => {
                        this.setState({
                            currentWord: word
                        });
                        resolve(word);
                    }, 200);

                });

            });

        }, Promise.resolve());
    }

    render () {
        var currentWord = this.state.currentWord;
        return <div>{currentWord}</div>;
    }
}

ReactTypeInAndOut.propTypes = {
    words: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default ReactTypeInAndOut;
