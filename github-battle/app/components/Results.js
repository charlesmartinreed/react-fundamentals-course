var React = require('react');

// player 1 and 2 information is actually embedded in props, inside of location -> search.
class Results extends React.Component {
	render() {
		console.log(this.props)
		return (
			<div>Results</div>
		)
	}
}

module.exports = Results;
