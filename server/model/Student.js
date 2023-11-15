/** @format */

const { Schema, model } = require("mongoose");
const studentSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"],
		default: "male",
		require: true,
	},
	fatherName: {
		type: String,
		require: true,
	},
	image: {
		type: String,
		require: true,
	},
	motherName: {
		type: String,
		require: true,
	},
	dateOfBirth: {
		type: Date,
		require: true,
	},
	status: {
		type: String,
		enum: ["pending", "approved", "block"],
		default: "pending",
		required: true,
	},
	studentHistory: [
		{
			classId: {
				type: Schema.Types.ObjectId,
				ref: "Class",
				required: true,
			},
			className: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				required: true,
			},
		},
	],
	guardian: {
		id: {
			type: Schema.Types.ObjectId,
			ref: "Guardian",
			req: true,
		},
		relation: {
			type: String,
			req: true,
		},
	},
});

const Student = model("Student", studentSchema);
module.exports = Student;
