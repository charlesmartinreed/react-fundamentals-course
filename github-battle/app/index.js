var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// component can have state
// component can have lifecycle events that let you hook into certain stages or lifecycles from your application
// component is responsible for rendering UI

class App extends React.Component {
	render() {
		/* return description of how the component looks */
		return (
			<div>
				Hello World!
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)
