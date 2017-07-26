var React = require('react');
var ReactDOM = require('react-dom');
var ReactTypeInAndOut = require('react-type-in-and-out');

class App extends React.Component {
    render () {
        return (
            <div>
              <div>
                <ReactTypeInAndOut
                  words={['react', 'type', 'in', 'and', 'out']}
                  startFullWord={true}
                  delayStart={2000}
                  delayOnWordFinish={1500}
                  speed={100}
                />
              </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
