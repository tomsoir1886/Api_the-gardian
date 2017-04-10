"use strict";

var Model = require('../models/guardian-content.model');

var handleData = (err, data, res) => {
	if (err) {
		res.status(404);	// not found
		console.error(err);
	} else {
		res.status(200)
			.json(data);	// ok/found
	}
}

var get = (req, res) => {
	if (req.query.id) {
		Model.find()
			.byContentId(req.query.id)
			.exec((err, data) =>
				handleData(err, data, res));
	} else {
		Model.find()
			.bySections(req.query.sections)
			.exec((err, data) =>
				handleData(err, data, res));
	}
};

var getSection = (req, res) =>
	Model.find()
		.bySection(req.params.section)
		.exec((err, data) => 
			handleData(err, data, res));

var getLatest = (req, res) =>
	Model.find()
		.latest()
		.exec((err, data) => 
			handleData(err, data, res));

module.exports = {
	get: get,
	getSection: getSection,
	getLatest: getLatest
}

