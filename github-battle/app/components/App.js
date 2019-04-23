var React = require('react');
var Popular = require('./Popular')

class App extends React.Component {
	render() {
		/* return description of how the component looks */
		return (
			<div className="container">
				<Popular />
			</div>
		)
	}
}

// since this is an ES5 version, we're using common JS
module.exports = App;
