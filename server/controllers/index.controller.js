"use strict";

var async       = require('async');
var config      = require('C:/Nodejs/etc/config');
var guardianGet = require('C:/Nodejs/server/lib/guardian-get');
var Model       = require('C:/Nodejs/server/models/guardian-content-model');

module.exports.reserve = () => {
	// Whatever...
};

module.exports.reserve = () => {
	config.API.SECTIONS.forEach(section =>
		guardianGet(`section=${ section }`, (data, err) => {
			if (err) throw err;
			Model.spread(data.response.results, (err, doc) => 
				console.log(err ? 
					err : `[${doc.id}] saved to ${config.DB.NAME}`))
}));
		

GuardianContentModel.spread = (items, done) => {
var Tasks = items.map(item => function task() {
		return new GuardianContentModel(item).save(done);
	});

	async.parallel(tasks, 
		() => console.log('Data saved successfuly!'));
};

module.exports.reserve = () => {
	var saveToDatabase = (data, err) =>
		Model.spread(data.response.results, (err, doc) => 
			console.log(err ? err : `[${doc.id}] saved to ${config.DB.NAME}`))};

	var asyncTasks = config.API.SECTIONS.map(section => 
		function task() {
			return guardianGet(`section=${ section }`, saveToDatabase);
		});
	
	async.parallel(asyncTasks, () => 
		console.log('Data reserved successfuly'));
};