var axios = require('axios');

// github id stuff, in case you find yourself being rate limited
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
//var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
	return axios.get('https://api.github.com/users/' + username)
		.then(function(user) {
			return user.data;
		})
}

function getRepos(username) {
	return axios.get('https://api.github.com/users/' + username + '/repos' + '?page=1&per_page=100')
}

// count is the initialValue, 0 since we passed in '0'
// repo is the array from which we pull our accumulator values
function getStarCount(repos) {
	return repos.data.reduce(function(count, repo) {
		return count + repo.stargazers_count;
	}, 0)
}

function calculateScore(profile, repos) {
	var followers = profile.followers;
	var totalStars = getStarCount(repos)

	return (followers * 3 + totalStars);
}

function handleError(error) {
	console.warn(error);
	return null;
}

// COMPOSING FUNCTION
// axios.all is Promise.all
// when have the player profile and their repos, we get an array of data
function getUserData(player) {
	return axios.all([
		getProfile(player),
		getRepos(player)
	]).then(function(data) {
		var profile = data[0];
		var repos = data[1];

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	})
}

// first player in the returned array is the one with the highest score
function sortPlayers(players) {
	return players.sort(function(a, b) {
		return b.score - a.score;
	})
}

// here's the real money - again, we're using axios.all to proceed only once we've received our payload
// when resolved, battle will have all the player info.
// then we sort

// ping github API, get most popular repos for particular language
// return repositories with more than 1 star, filtered by the language we pass to the call, sorted by amount of stars in desc order

// encodeURI will convert our human-readable characters into corresponding query strings, etc.
module.exports = {
	battle: function(players) {
		return axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)
	},

	fetchPopularRepos: function (language) {
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

		return axios.get(encodedURI).then(function(res) {
			return res.data.items;
		})
	}
}
