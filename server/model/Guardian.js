/** @format */

const { Schema, model } = require("mongoose");
const guardianSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	occupation: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	status: {
		type: String,
		enum: ["pending", "approved", "block"],
		default: "pending",
		required: true,
	},
});

const Guardian = model("Guardian", guardianSchema);
module.exports = Guardian;
