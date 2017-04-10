"use strict";

var mongoose = require('mongoose'),
	async    = require('async');

var GuardianContentSchemaOptions = {
	timestamps: {},
	safe: true
}

var GuardianContentSchema = new mongoose.Schema({
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
	return this.findOne({ 
		id: id 
	});
};

GuardianContentSchema.query.latest = function() {
	return this.find()
		.sort('-date')
		.limit(10);
};

GuardianContentSchema.query.bySections = function(sections) {
	return this.find({ 
			sectionId: { 
				$in: sections.split(',') 
			}
		})
		.limit(20);
};

GuardianContentSchema.query.bySection = function(section) {
	return this.find({ 
			sectionId: section 
		})
		.limit(10);
};


GuardianContentSchema.pre('save', function(next) {
	var lastSlashPosition = this.id.lastIndexOf('/');
	var newID = this.id.slice(++lastSlashPosition, this.id.length);
	this.id = newID;
	next();
});

var GuardianContentModel = mongoose.model("news", GuardianContentSchema);

GuardianContentModel.spread = (items, callback) => {
	var tasks = items.map(item => function task() {
		return new GuardianContentModel(item).save(callback);
	});

	async.parallel(tasks, 
		() => console.log('Data saved successfuly!'));
};

module.exports = GuardianContentModel;