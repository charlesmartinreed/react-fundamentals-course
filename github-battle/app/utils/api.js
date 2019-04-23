var axios = require('axios');

module.exports = {
	fetchPopularRepos: function (language) {
		// ping github API, get most popular repos for particular language
		// return repositories with more than 1 star, filtered by the language we pass to the call, sorted by amount of stars in desc order

		// encodeURI will convert our human-readable characters into corresponding query strings, etc.
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

		return axios.get(encodedURI).then(function(res) {
			return res.data.items;
		})
	}
}
