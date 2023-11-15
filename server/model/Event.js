const { Schema, model } = require('mongoose')
const eventSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["public", "private", "block"],
		default: "public",
		required: true,
	},
	eventDate: {
		type: Date,
		required: true,
	},
	createdDate: {
		type: Date,
		default: new Date(),
		required: true,
	},
});

const Event = model('Event', eventSchema)
module.exports =  Event