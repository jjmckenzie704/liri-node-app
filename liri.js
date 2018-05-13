require("dotenv").config();

var keys = require("keys");
var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);
