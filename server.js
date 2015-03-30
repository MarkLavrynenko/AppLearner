var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var media = require("./media");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(__dirname, '.'), './')));

app.use("/media", media);

var port = 9000;
app.listen(port, function(request, response) {
	console.log("Server is running on port ", port);
})
