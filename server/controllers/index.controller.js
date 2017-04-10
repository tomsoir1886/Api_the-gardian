"use strict";

var async       = require('async');
var config      = require('../../etc/config');
var guardianGet = require('../lib/guardian-get');
var Model       = require('../models/guardian-content.model');

module.exports.reserve = () => {
	var saveToDatabase = (data, err) =>
		Model.spread(data.response.results, (err, doc) => 
			console.log(err ? err : `[${ doc.id }] saved to ${ config.DATABASE.NAME }`));

	var asyncTasks = config.API.SECTIONS.map(section => 
		function task() {
			return guardianGet(`section=${ section }`, saveToDatabase);
		});
	
	async.parallel(asyncTasks, () => 
		console.log('Data reserved successfuly'));
};