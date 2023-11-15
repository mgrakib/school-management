const { Schema, model } = require('mongoose')
const AdmissionSchema = new Schema({
	guardianId: {
		type: Schema.Types.ObjectId,
		ref: "Guardian",
		required: true,
	},
	studentId: {
		type: Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: new Date(),
	},
	email: {
		type: String,
		required: true,
	},
	classId: {
		type: Schema.Types.ObjectId,
		ref: "Class",
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "approved", "block"],
		default: "pending",
	},
});

const Admission = model("Admission", AdmissionSchema)
module.exports = Admission;