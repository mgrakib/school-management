/** @format */

const { Schema, model } = require("mongoose");
const schemaDesign = {
	name: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		require: true,
	},
	students: {
		type: Map,
		of: Object,
	},
};
const classOneSchema = new Schema(schemaDesign);

const ClassModel = model("classes", classOneSchema);
module.exports = ClassModel;