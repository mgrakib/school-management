/** @format */

const error = require("../utils/error");
const Admission = require("../model/Admission");
const Guardian = require("../model/Guardian");
const Student = require("../model/Student");
const ClassModel = require("../model/ClassModel/ClassModel");
const { updateField } = require("./utils.service");
const admissionRequestService = async data => {
	const {
		guardianName,
		occupation,
		city,
		state,
		address,
		mobile,
		email,
		guardianImage,
		studentName,
		gender,
		fatherName,
		motherName,
		dateOfBirth,
		studentImage,
		relation,
		classId,
	} = data;
	const classData = await ClassModel.findById(classId);

	if (!classData) {
		const SM_ERROR = error(404, "This class is not available");
	} else {
		const admissionData = await Admission.findOne({ email });
		if (admissionData) {
			const SM_ERROR = error(
				400,
				"User is Already Exist. You don't have to create new account but you can admit your Student by login."
			);
			throw SM_ERROR;
		} else {
			let guardian = new Guardian({
				name: guardianName,
				occupation,
				city,
				state,
				address,
				mobile,
				email,
				image: guardianImage,
			});
			let student = new Student({
				name: studentName,
				gender,
				fatherName,
				motherName,
				dateOfBirth,
				image: studentImage,
				guardian: {
					id: guardian._doc._id,
					relation,
				},
				studentHistory: [
					{
						classId,
						className: classData._doc.name,
						date: new Date(),
					},
				],
			});

			guardian.students.push(student._doc._id);

			const admission = new Admission({
				guardianId: guardian._doc._id,
				studentId: student._doc._id,
				date: new Date(),
				email,
				classId,
			});
			const newStudent = await student.save();
			const newGuardian = await guardian.save();
			const newAdmission = await admission.save();

			const response = {
				message: "Admission Submited succeffully",
				data: {
					guardianName,
					mobile,
					email,
					studentName,
					gender,
					fatherName,
					motherName,
					dateOfBirth,
					classId,
				},
				links: {
					self: "/admission",
					applicationStatus: `/admission-status/${newAdmission._id}`,
				},
			};
			return response;
		}
	}
};

const getAdmissionService = async data => {
	const { id } = data;
	if (!id) {
		const SM_ERROR = error(400, "Expect id but got null");
		throw SM_ERROR;
	}
	const admissionData = await Admission.findById(id);
	if (!admissionData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		const guardian = await Guardian.findById(admissionData._doc.guardianId);
		const student = await Student.findById(admissionData._doc.studentId);

		const response = {
			message: "Fetch admission successfully",
			data: {
				id,
				status: admissionData.status,
				guardianName: guardian.name,
				occupation: guardian.occupation,
				mobile: guardian.mobile,
				email: guardian.email,
				address: `${guardian.address}, ${guardian.state}, ${guardian.city}`,
				guardianImage: guardian.image,
				studentName: student.name,
				gender: student.gender,
				studentImage: student.image,
				dateOfBirth: student.dateOfBirth,
				relationWithGuardian: student.guardian.relation,
			},
		};
		return response;
	}
};

const updateAdmissionService = async (id, body) => {
	const { status } = body;
	// const admissionData = await Admission.findById(id);
	if (!id) {
		const SM_ERROR = error(400, "Expect id but got null");
		throw SM_ERROR;
	}

	const admissionData = await updateField(
		Admission,
		"id",
		id,
		"status",
		status
	);

	const guardian = await updateField(
		Guardian,
		"id",
		admissionData?.guardianId,
		"status",
		status
	);

	return {
		admissionData,
		guardian,
	};
};

module.exports = {
	admissionRequestService,
	getAdmissionService,
	updateAdmissionService,
};
