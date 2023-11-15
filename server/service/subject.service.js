/** @format */

const Subject = require("../model/Subject");
const error = require("../utils/error");
const postSubjectService = async data => {
	const { year, subject } = data;

	const subjectData = await Subject.findOne({ year });

	if (subjectData) {
		const values = {};
		subjectData.subject.forEach((value, mapKey) => {
			values[mapKey] = value;
		});
		
		const newObject = {
			...subject,
			...values,
		};
		subjectData.subject = newObject
		await subjectData.save()
		const response = {
			message: "Successfully add class",
			data: subjectData,
		};
		return response;
	} else {
		const subjectData = new Subject({
			year,
			subject,
		});
		const newSubject = await subjectData.save();
		const response = {
			message: "Successfully add class",
			data: newSubject,
		};
		return response;
	}
};
const getSubjectService = async data => {
	const { classId, date } = data;
	const subjectData = await Subject.findOne({ year: date });
	if (!subjectData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		const classSubjectData = subjectData.subject.get(classId);
		const response = {
			message: "fetch data successfully",
			data: classSubjectData ? classSubjectData : [],
		};
		return response;
	}
};

const deleteSubjectService = async data => {
	const { classId, subject, date } = data;
	let subjectData = await Subject.findOne({ year: date });
	if (!subjectData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		if (subject) {
			const newSubject = subjectData.subject
				.get(classId)
				.filter(subjectValue => subjectValue !== subject);
			subjectData.subject.set(classId, newSubject);

			await subjectData.save();
		} else {
			const values = {};
			subjectData.subject.forEach((value, mapKey) => {
				if (mapKey !== classId) {
					values[mapKey] = value;
				}
			});
			subjectData.subject = values;

			await subjectData.save();
		}
		return subjectData;
	}
};

const updateSubjectService = async data => {
	const { classId, year, oldSubject, newSubject } = data;
	const subjectData = await Subject.findOne({ year });
	console.log(subjectData, " this is value");
	if (!subjectData) {
		const SM_ERROR = error(404, "Data Not Found");
		throw SM_ERROR;
	} else {
		const classSubject = subjectData.subject
			.get(classId)
			.filter(subject => subject !== oldSubject);

		subjectData.subject.set(classId, [...classSubject, newSubject]);
		await subjectData.save();
		return subjectData;
	}
};

module.exports = {
	postSubjectService,
	getSubjectService,
	deleteSubjectService,
	updateSubjectService,
};
