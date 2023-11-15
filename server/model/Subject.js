/** @format */

const { Schema, model } = require("mongoose");
const subjectSchema = new Schema({
	year: {
		type: String,
		required: true,
	},
	subject: {
		type: Map,
		of: Object,
	},
});

const Subject = model("Subject", subjectSchema);
module.exports = Subject;
