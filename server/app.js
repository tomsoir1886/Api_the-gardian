"use strict";

var express    = require('express'),
	path       = require('path'),
	mongoose   = require('mongoose'),
	config     = require('../etc/config');

var app = express();

mongoose.connect(
	`mongodb://${config.DATABASE.HOST}/${config.DATABASE.NAME}`, 
	err => {
		if (err) throw err;
		console.log("Magic connected to database");
	});

var routes = {
	index: require('./routes/index.route'),
	news:  require('./routes/news.route')
}

app.use('/', routes.index);
app.use('/news', routes.news);

app.listen(config.SERVER.PORT, config.SERVER.HOST, () =>
    console.log(`\nMagic happens on port ${config.SERVER.PORT}`));