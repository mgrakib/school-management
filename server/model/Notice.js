/** @format */

const { Schema, model } = require("mongoose");
const noticeSchema = new Schema({
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
	noticeDate: {
		type: Date,
		required: true,
	},
	createdDate: {
		type: Date,
		default: new Date(),
		required: true,
	},
});

const Notice = model("Notice", noticeSchema);
module.exports = Notice;
