// server/models/guardian-content-model.js
"use strict";

var mongoose = require('mongoose');

var GuardianContentSchemaOptions = {
	timestamps: {},
	safe: true
}

var GuardianContentSchema = new mongoose.Schema({
	id: {
		type: String,
		index: true
	},
	sectionId: {
		type: String,
		required: true
	},
	type: {
		type: String,
		default: 'article'
	},
	webPublicationDate: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	webUrl: {
		type: String,
		required: true
	},
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

GuardianContentSchema.query.bySectionsSection = function(section) {
	return this.find({ 
			sectionId: section 
		})
		.limit(10);
};

var GuardianContentModel = mongoose.model("news", GuardianContentSchema);

GuardianContentModel.spread = (items, done) =>
	items.forEach(item =>
		new GuardianContentModel(item)
			.save(done));

module.exports = GuardianContentModel;

