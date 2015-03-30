var express = require("express");
var router = express.Router();
var request = require("request");
var fs = require("fs");
var cheerio = require('cheerio');

function getProviderUrl(word, provider) {
	if (provider == "urban") {
		return "http://www.urbandictionary.com/define.php?term=" + word;
	}
	return "https://translate.google.com/translate_tts?ie=UTF-8&q=" + word + "&tl=en&total=1&idx=0&textlen=5&client=t";
}

router.get("/", function(req, res) {
	var word = req.query.word;
	var provider = req.query.provider;
	var url = getProviderUrl(word, provider);
	if (provider == "google") {
		request.get(url).pipe(res);
	} else {
		console.log(url);
		var fileWriter = request.get(url).pipe(fs.createWriteStream("tmp.html"));
		fileWriter.on("finish", function() {
			var $ = cheerio.load("<div>Test parser</div>");
			//res.send($('div').text());
			res.send("No Answer")
		});
	}	
	
});

module.exports = router;