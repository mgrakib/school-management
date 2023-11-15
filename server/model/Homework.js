/** @format */

const { Schema, model } = require("mongoose");
const HomeworkSchema = new Schema({
	assignDate: {
		type: Date,
		required: true,
		default: new Date(),
	},
	submissionDate: {
		type: Date,
		required: true,
	},
	teacherName: {
		type: String,
		required: true,
	},
	teacherId: {
		type: Schema.Types.ObjectId,
		ref: "Teacher",
		required: true,
	},
	subjectName: {
		type: String,
		required: true,
	},
	task: {
		type: String,
		required: true,
	},
	classId: {
		type: Schema.Types.ObjectId,
		ref: "ClassModel",
		required: true,
	},
});

const Homework = model("Homework", HomeworkSchema);
module.exports = Homework;
