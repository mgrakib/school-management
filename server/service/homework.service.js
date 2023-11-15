/** @format */
var format = require("date-fns/format");
const Homework = require("../model/Homework");
const error = require("../utils/error");
const getAllHomeWorkService = async query => {
	let { field_key, date, classId } = query; // Fixed typo: changed data to date

	const homeworkData = await Homework.find({
		[field_key]: date,
		classId,
	});

	const response = {
		message: "Homework data fetch successful",
		data: {
			date,
			homeworks: homeworkData,
		},
	};
	return response; // You might want to include homeworkData in the returned object as well
};

const getSingleHomeWorkService = async id => {
	if (!id) {
		const SM_ERROR = error("400", "Homework Id id required but got none");
		throw SM_ERROR;
	}
	const homeworkData = await Homework.findById(id);
	if (!homeworkData) {
		const SM_ERROR = error("404", "Data Not Found");
		throw SM_ERROR;
	} else {
		const response = {
			message: "Homework Data Fetch Successfully",
			data: {
				...homeworkData._doc,
			},
			links: {
				self: `/homeworks/${homeworkData._doc._id}`,
				teacherProfile: `/teachers/${homeworkData._doc.teacherId}`,
				classHomework: `homeworks?field_key=assignDate&date=${format(
					homeworkData._doc.assignDate,
					"yyyy-M-d"
				)}&classId=${homeworkData._doc.classId}`,
			},
		};
		return response;
	}
};
const postHomeworkService = async data => {
	const homeworkData = new Homework({
		...data,
	});

	await homeworkData.save();
	const response = {
		message: "Home work Created successful",
		data: {
			...homeworkData._doc,
		},
		links: {
			self: `/homeworks/${homeworkData._id}`,
		},
	};

	return response;
};

const updateHomeWorkService = async data => {
	const { t_id, id, body } = data;
	let homework = await Homework.findById(id);

	if (!homework) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		if (homework?.teacherId.toString() !== t_id) {
			const SM_ERROR = error(401, "Forbidden Access");
			throw SM_ERROR;
		} else {
			Object.assign(homework, body);
			await homework.save();

			return {
				message: "successfully Update Data",
				data: {
					...homework?._doc,
				},
				links: {
					self: `/homeworks/${homework?._doc._id}`,
				},
			};
		}
	}
};

const deleteHomeWorkService = async (id, t_id) => {
	if (!id) {
		const SM_ERROR = error(400, "Bad Request");

		throw SM_ERROR;
	}

	const existHomework = await Homework.findById(id);

	if (!existHomework) {
		const SM_ERROR = error(404, "Data Not Found");
		throw SM_ERROR;
	} else {
		if (existHomework._doc.teacherId.toString() !== t_id) {
			// const teacherData = await Teacher.findById({ _id: t_id });
			// if (teacherData.role === "admin") {
			// 	await Homework.deleteOne({ _id: id });
			// } else {
			// 	const SM_ERROR = error(401, "Unauthorized Access");
			// 	throw SM_ERROR;
			// }
			TODO: "make it allow for admin";
			const SM_ERROR = error(401, "Unauthorized Access");
			throw SM_ERROR;
		} else {
			await Homework.deleteOne({ _id: id });
			return {
				message: "Home work deleted successfully",
				status: 203,
			};
		}
	}
};

module.exports = {
	getAllHomeWorkService,
	getSingleHomeWorkService,
	postHomeworkService,
	updateHomeWorkService,
	deleteHomeWorkService,
};
