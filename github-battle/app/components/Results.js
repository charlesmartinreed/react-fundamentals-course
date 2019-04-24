var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;

// player 1 and 2 information is actually embedded in props, inside of location -> search.
// using queryString's parse method gives us an object that has a playerOne and playerTwo property
// battle returns a promise that contains sorted results (array) for the winner and loser
class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount() {
		var players = queryString.parse(this.props.location.search);

		api.battle([
			players.playerOneName,
			players.playerTwoName
		])
			.then(function(results) {
				if (results === null) {
					return this.setState(function() {
						return {
							error: 'Looks like there was an error. Check that both users exist on Github',
							loading: false
						}
					});
				}

				this.setState(function() {
					return {
						error: null,
						winner: results[0],
						loser: results[1],
						loading: false
					}
				})
			}.bind(this));
	}
	render() {
		var { error, winner, loser, loading } = this.state;

		if (loading) {
			return <p>Loading</p>
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div>{JSON.stringify(this.state, null, 2)}</div>
		)
	}
}

module.exports = Results;
