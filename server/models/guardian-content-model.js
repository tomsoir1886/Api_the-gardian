"use strict";

const mongoose = require('mongoose');
const async = require('async');

const GuardianContentModelName = 'guardian-content-entry';

const GuardianContentSchemaOptions = {
	timestamps: {},
	safe: true
}

const GuardianContentSchema = new mongoose.Schema({
	id: {
		type: String,
		index: true
	},
	sectionId: String,
	type: String,
	webPublicationDate: Date,
	title: String,
	webUrl: String,
	fields: {
		headline: String,
		trailText: String,
		byline: String,
		main: String,
		body: String
	}
}, GuardianContentSchemaOptions);

GuardianContentSchema.query.byContentId = function(id) {
	return this.findOne({ id: id });
};

GuardianContentSchema.query.latest = function() {
	return this.find()
		.sort('-date')
		.limit(10);
};

GuardianContentSchema.query.ofSections = function(sections) {
	return this.find({ sectionId: { $in: sections.split(',') }})
		.limit(20);
};

GuardianContentSchema.query.ofSection = function(section) {
	return this.find({ sectionId: section })
		.limit(10);
};

const GuardianContentModel = mongoose.model(GuardianContentModelName, GuardianContentSchema);

GuardianContentModel.spread = (items, callback) => {
	var tasks = items.map(item => function task() {
		return new GuardianContentModel(item).save(callback);
	});

	async.parallel(tasks, 
		() => console.log('Data saved successfuly!'));
}

module.exports = mongoose.model(GuardianContentModelName, GuardianContentSchema);