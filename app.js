var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	request = require('request');

mongoose.connect('mongodb://localhost:27017/news_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	var url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=280dfd6b865d405aaa618824b4d544e4';
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.send(data);
		}
	});
});

app.listen(3000, function() {
	console.log('The NewsAPP Server Has Started!');
});
