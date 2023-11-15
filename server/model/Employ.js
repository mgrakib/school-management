/** @format */

const { Schema, model } = require("mongoose");

const employSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	department: [],
	subject: [],
	address: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	priority: {
		type: Number,
		required: true,
		default: 99,
	},
});

const Employ = model("Employ", employSchema);

module.exports = Employ;
