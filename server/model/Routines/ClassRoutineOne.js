/** @format */

const { Schema, model } = require("mongoose");
const classRoutineOneSchema = new Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	classId: {
		type: Schema.Types.ObjectId,
		ref: "ClassModel",
		required: true,
	},
	routine: {
		type: Map,
		of: {
			isHoliday: {
				type: String,
				enum: ["no", "yes"],
				default: "no",
				required: true,
			},
			startTime: {
				type: String,
			},
			endTime: {
				type: String,
			},
			subjectId: {
				type: Schema.Types.ObjectId,
				ref: "Subject",
			},
			teacherId: {
				type: Schema.Types.ObjectId,
				ref: "Teacher",
			},
		},
	},
});

const ClassRoutineOne = model("ClassRoutineOne", classRoutineOneSchema);
module.exports = ClassRoutineOne;
