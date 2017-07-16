var React = require('react');
var ReactDOM = require('react-dom');
var ReactTypeInAndOut = require('react-type-in-and-out');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactTypeInAndOut />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
