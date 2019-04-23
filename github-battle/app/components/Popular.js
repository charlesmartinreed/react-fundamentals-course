var React = require('react');
var PropTypes = require('prop-types');

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
			selectedLanguage: 'All'
		}
		/* remember that update lanuage is not automagically bound to the this keyword that corresponds to our Popular component instance. Now it is.*/
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage: lang
			}
		})
	}

	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
			</div>
		)
	}
}

module.exports = Popular;
