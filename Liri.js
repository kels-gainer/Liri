var keys = require("./keys.js")

var fs = require("fs")

require("dotenv").config();

var axios = require("axios")
var Spotify = require("node-spotify-api")

var input = process.argv;
var subject = input[2];
var answer = input.slice(3).join(" ");

switch(subject) {

    case "movie-this":
    movie(answer);
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
    
function movie(data) {
        var divider = "\n_____________________\n\n";
        var URL = "http://www.omdbapi.com/?t=" + data + "&y=&plot=&short&apikey=trilogy";

            axios
            .get(URL)
            .then(function(response){
                var jsonData = response.data;
                console.log(jsonData);
                
                var movieData = [
                    "Title: " + jsonData.title,
                    "Year: " + jsonData.year,
                    "Rotten Tomatoes Rating: " + jsonData.ratings[1],
                    "Imdb Rating: " + jsonData.imbdRating,
                    "Country: " + jsonData.country,
                    "Language: " + jsonData.language,
                    "Cast: " + jsonData.actors,
                    "Plot: " + jsonData.plot
                ].join("\n\n")

                fs.appendFile("log.txt", movieData = divider, function(err) {
                    if (err) throw err;
                    console.log("movieData: " + movieData);
                });
            });
    }


// FINDING MUSIC

function spotify(answer) {

    

    var spotify = new Spotify ({
        id: "89104bd82e884c358eb8dab68750b016",
        secret: "946e63777d7349d4bc2b584d429f454d"
    });
    
    spotify
    .request("https://api.spotify.com/v1/search?type=track&q="+ answer)
    .then(function(data){

        var spotData = data.tracks.items[1].album;
        console.log(spotData);
        
        var musicData = [
            "Artist: " + spotData.artists[0].name,
            "Album: " + spotData.name,
            "Url: " + spotData.external_urls.spotify,
            "Song: " + spotData.name
        ]
    
        fs.appendFile("log.txt", musicData, function(err) {
            if (err) throw err;
            console.log("musicData: " + musicData);
        });
    });
}


// FIND BANDS

    function bands(artist) {
        var divider = "\n_____________________\n\n";
            var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
            
            axios
            .get(URL)
            .then(function(response){
                var jsonData = response.data;
                console.log(jsonData);

                
                var bandData = [
                    "Artist Name: " + jsonData.name,
                    "Tour Dates: " + "href", jsonData.url,
                    "Location: " + jsonData.venue,
                    "Venue: " + jsonData.venue
                ].join("\n\n")
    
                fs.appendFile("log.txt", bandData = divider, function(err) {
                    if (err) throw err;
                    console.log("badData: " + bandData);
                });
            });
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
