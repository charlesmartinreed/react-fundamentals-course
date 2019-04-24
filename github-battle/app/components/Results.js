var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api')

// player 1 and 2 information is actually embedded in props, inside of location -> search.
// using queryString's parse method gives us an object that has a playerOne and playerTwo property
// battle returns a promise that contains sorted results (array) for the winner and loser
class Results extends React.Component {
	componentDidMount() {
		var players = queryString.parse(this.props.location.search);
		api.battle([
			players.playerOneName,
			players.playerTwoName
		])
			.then(function(results) {
				console.log(results);
			})
	}
	render() {
		return (
			<div>Results</div>
		)
	}
}

module.exports = Results;
