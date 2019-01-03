var keys = require("./keys.js")

var fs = require("fs")

require("dotenv").config();

var request = require("request");
var axios = require("axios")
var Spotify = require("node-spotify-api")

var input = process.argv;
var subject = input[2];
var answer = input[3];

switch(subject) {

    case "movie-this":
    omdbapi(answer);
    break;

    case "spotify-this-song":
    spotify(answer);
    break;

    case "concert-this":
    bands(answer);
    break;

    case "do-what-it-says":
    doIt();
    break;
}


// FINDING MOVIES

function omdbapi(answer) {
    
    var Movie = function() {
        var divider = "\n_____________________\n\n";
        this.findMovie = function(movie) {
            var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=&short&apikey=trilogy";

            axios
            .get(URL)
            .then(function(response){
                var jsonData = response.data;
                console.log(jsonData);
                
                var movieData = [
                    "Title: " + jsonData.title,
                    "Year: " + jsonData.year,
                    "Rating: " + jsonData.rated,
                    "Plot: " + jsonData.plot
                    // rotten tomatoes rating, country, language, actors list
                ].join("\n\n")
                // default "Mr Nobody"

                fs.appendFile("log.txt", movieData = divider, function(err) {
                    if (err) throw err;
                    console.log("movieData: " + movieData);
                });
            });
        };
    }

}


// FINDING MUSIC

function spotify(answer) {

    var Spotify = require("node-spotify-api");

    var Spotify = new Spotify ({
        id: "89104bd82e884c358eb8dab68750b016",
        secret: "946e63777d7349d4bc2b584d429f454d"
    });
    
    Spotify
    .request("https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx")
    .then(function(data){
        console.log(data);
        
        var musicData = [
            "Artist: " + jsonData.artists,
            "Album: " + jsonData.name,
            // preview link for song, if no song default to "the sign" by ace of base
        ]
    
        fs.appendFile("log.txt", musicData = divider, function(err) {
            if (err) throw err;
            console.log("musicData: " + musicData);
        });
    });
}


// FIND BANDS

function bands(answer) {

    var Bands = function() {
        var divider = "\n_____________________\n\n";
        this.findBands = function(band) {
            var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
            axios
            .get(URL)
            .then(function(response){
                var jsonData = response.data;
                console.log(jsonData);
                
                var bandData = [
                    // need to add info for name of venue, location, date of event (using moment mm/dd/yy)
                    "Artist Name: " + jsonData.name,
                    "Up Coming Events: " + jsonData.upcoming_event_count,
                    "Tour Dates: " + "href", jsonData.url
                ].join("\n\n")
    
                fs.appendFile("log.txt", bandData = divider, function(err) {
                    if (err) throw err;
                    console.log("badData: " + bandData);
                });
            });
        };
    }
}

function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var songcheck = dataArr[1].slice(1, -1);
            spotify(songcheck);
        } else if (dataArr[0] === "movie-this") {
            var checkMovie = dataArr[1].slice(1, -1);
            omdbapi(checkMovie);
        } else if (dataArr[0] === "concert-this") {
            var bandsCheck = dataArr[1].slice(1, -1);
            bands(bandsCheck);
        }
    });
};


module.exports = Movie, Spotify, Bands;

