var express = require('express');
var router = express.Router();
var request = require("request")


var config = {
    apikey: "&api_key=55e2d237df80ec5178651841fda5124c",
    baseUrl: 'http://api.themoviedb.org/3/',
    imageBase: 'http://image.tmdb.org/t/p/w300',
    imageBaseFull: 'http://image.tmdb.org/t/p/original',
    nowPlayingEP: 'movie/now_playing?',
};

/* GET home page. */
router.get('/', function(req, res, next) {

    request.get(config.baseUrl + config.nowPlayingEP + config.apikey, (error, response, movieData)=>{
        movieData = JSON.parse(movieData);
        console.log(typeof(movieData));
        // res.json(movieData);
        res.render("index", {
            movieStuff: movieData,
            imageUrl: config.imageBase
        });

    });

  // res.render('index', { title: 'Express' });
});

router.post("/searchMovie", (req,res,next)=>{

    var searchString = encodeURI(req.body.movieSearch);
    var queryUrl = config.baseUrl + "search/movie?" + config.apikey + "&query=" + searchString;
    // res.send(queryUrl);
    request.get(queryUrl, (error, response, searchData)=>{
        searchData = JSON.parse(searchData);
        res.render("index", {
            movieData: searchData,
            imageUrl: config.imageBase
        });
    })
});

router.get("/searchMovie", (req,res,next)=>{
    res.send("im get route");
})

module.exports = router;
