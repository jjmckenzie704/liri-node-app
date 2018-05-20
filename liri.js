require("dotenv").config();

var keys = require("./keys");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var songName = "";
var trigger = false;

function results(a, b){
  if (process.argv[2] ==  "my-tweets"){
    var params = {screen_name: 'lawrencejohnny8'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (i = 0; i < tweets.length; i++){
          console.log(tweets[i].text);
        } 
      }
    });
  }

  if (process.argv[2] ==  "spotify-this-song" || a == "spotify-this-song"){
    if (process.argv[2] == "do-what-it-says"){
      var songName = b;
    
      }

      else {
        var songName = process.argv.slice(3).join(" ").toLowerCase().split(' ').map(function(word) { return word.replace(word[0], word[0].toUpperCase()) }).join(' ');
    }
  
     if (process.argv[3] == undefined && trigger == false) {
      spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
          if (data.tracks.items[i].artists[0].name == "Ace of Base" && data.tracks.items[i].name == "The Sign"){
            console.log(data.tracks.items[i].artists[0].name);
            console.log(data.tracks.items[i].name);
            console.log(data.tracks.items[i].album.name);
            console.log(data.tracks.items[i].artists[0].external_urls.spotify);
          }
        }
      });
    } else {
      
        spotify.search({ type: 'track', query: songName }, function(err, data) {
         
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          
          for (var i = 0; i < data.tracks.items.length; i++) {
           
            if (data.tracks.items[i].name == songName){
              
              console.log(data.tracks.items[i].artists[0].name);
              console.log(data.tracks.items[i].name);
              console.log(data.tracks.items[i].album.name);
              console.log(data.tracks.items[i].artists[0].external_urls.spotify);
            }
          }
        });
      }
  }

  if (process.argv[2] == "movie-this"){
    request('http://www.omdbapi.com/?t=' + process.argv.slice[3] + '&y=&plot=short&apikey=trilogy', function(error, response, body) {
      if (!error && response.statusCode === 200) {  
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(JSON.parse(body).imdbRating);
        console.log(JSON.parse(body).Title);
 
        for (key in JSON.parse(body).Ratings){
          if (JSON.parse(body).Ratings[key].Source == 'Rotten Tomatoes') { 
            console.log(JSON.parse(body).Ratings[key].Value); 
          }
        }
          console.log(JSON.parse(body).Country);
          console.log(JSON.parse(body).Language);
          console.log(JSON.parse(body).Plot);
          console.log(JSON.parse(body).Actors);  
      } else {
        console.log(error);
      }
    });
  }
  if (process.argv[2] == 'do-what-it-says' && trigger == false) {
    trigger = true;
    //get text from random.txt
    fs.readFile("random.txt", "utf8", function(error, data){

    data = data.split(",");
  
    let command = data[0];
    let searchterm = data[1];

   results(command, searchterm);  // feed it to results function
    })
   
    
           
  }

}

var userInput = process.argv[2];
results(userInput);

