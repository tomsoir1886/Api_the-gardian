"use strict";

var http = require('http'),
	https  = require('https'),
	config = require('../../etc/config');

function httpGET(options, done) {
	var server = options.port === 443 ? https : http;
	var req = server.request(options, res => {
		var output = '';
		res.setEncoding('utf8');
		res.on('data', chunk => output += chunk);
		res.on('end', () => done(JSON.parse(output), null));
		console.log(`Request status: ${options.host}:${res.statusCode}`);
	});

	req.on('error', err => done(null, err));
	req.end();
}

module.exports = (query, done) => {
    var queryTemplate = `/search?show-fields=${config.API.FIELDS.join(',')}&api-key=${config.API.KEY}&${query}`;
    var requestOptions = {
        host: 'content.guardianapis.com',
        port: 443,
        path: queryTemplate,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    httpGET(requestOptions, done);
};