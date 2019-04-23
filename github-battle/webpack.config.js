var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

// describes webpack settings

// jsx converted via @babel-react, older JS language support also added via @babel/env, passed in via babel-loader

// css files are transformed with the style-loader and css-loader

// html-webpack-plugin automatically generates an index.html file that dynamically includes a reference to our output file

// publicPath sets the base for all of our assets - long story short, this actually redirects us to '/' when we request assets for a page
module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader'},
			{ test: /\.css$/, use: ['style-loader', 'css-loader']}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'app/index.html'
		})
	]
}
