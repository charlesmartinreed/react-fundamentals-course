var React = require('react');
var Popular = require('./Popular');

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

var Nav = require('./Nav');
var Home = require('./Home');

class App extends React.Component {
		/* render Router, set components to be rendered only at specific paths */
	render() {
		return (
			<Router>
			<div className="container">
				<Nav />

				<Route exact path='/' component={Home} />
				<Route path='/popular' component={Popular} />

			</div>
			</Router>
		)
	}
}

// since this is an ES5 version, we're using common JS
module.exports = App;
