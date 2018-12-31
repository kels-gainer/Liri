var axios = require("axios");
var fs = require ("fs");

var Spotify = function() {
    var divider = "\n________________________________\n\n"
    this.findMusic = function(music) {
        var URL = ""
    }
}

axios.get(URL)
.then(function(response) {
    var jsonData = response.data;
    console.log(jsonData);

    var musicData = [
        // get perameters for music
    ].join("\n\n")
    
    fs.appendFile("log.txt", musicData + divider, function(err) {
        if (err) throw err;
        console.log("musicData: " + musicData);
    });
});