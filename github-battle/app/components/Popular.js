var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// stateless functional component
function SelectLanguage(props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className="languages">

			{languages.map(function(lang) {
				return (
					<li
						style={lang === props.selectedLanguage ? { color: '#d0021b'} : null }
						key={lang}
						onClick={props.onSelect.bind(null, lang)}
					>
						{lang}
					</li>
				)
			})}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedLanguage: 'All',
			repos: null
		}
		/* remember that update lanuage is not automagically bound to the this keyword that corresponds to our Popular component instance. Now it is.*/
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		/* This lifecycle event is where you'll want to make any AJAX requests */
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		/* again, because we're making another function inside of then, the 'this' in this.setState won't be what we might expect. We bind to tell the function which 'this' should apply here */
		api.fetchPopularRepos(lang)
		.then(function(repos) {
			this.setState(function() {
				return {
					repos: repos
				}
			})
		}.bind(this))
	}

	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{JSON.stringify(this.state.repos, null, 2)}
			</div>
		)
	}
}

module.exports = Popular;
