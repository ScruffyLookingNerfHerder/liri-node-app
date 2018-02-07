var dotenv = require("dotenv").config();
var keys = require("./keys.js");



var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var choice = process.argv[2];

function showmytweets (){
  var params = {
    screen_name: 'ScrfyNrfHrdr',
    count: 20,
    truncated: false
    };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

      for (i = 0; i < tweets.length; i ++){

        var createdate = tweets[i].created_at;
        var text = tweets[i].text;
        console.log("-------------------------------------------------------------------------------------------------------------------")
        console.log("");
        console.log(createdate);
        console.log(text);
        console.log("");
        console.log("===================================================================================================================");
        console.log("");
      }
    }
  });
};

function thissong(){
  spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 })
    .then(function(response) {
      console.log(JSON.stringify(response, null, 3))

      var results = response.tracks.items;


      for (var j = 0; j < results.length; j++){

        console.log("------------------------------")
        console.log("Song Name: " + results[j].name);
        console.log("Album: " + results[j].album.name);
        console.log("Artists: " + results[j].album.artists[3]);


      }


    })
    .catch(function(err) {
      console.log(err);
    });
}

function movies(){


}

function dowhatitsays(){

}

if (choice == 'my-tweets'){
  showmytweets();
} else if (choice == 'spotify-this-song'){
  thissong();
} else if (choice == 'movie-this'){
  movies();
} else if (choice == 'do-what-it-says'){
  dowhatitsays();
} else {
  console.log('Please give a command!')
}
