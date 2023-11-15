/** @format */
var { addDays, format, subDays } = require("date-fns");
const mongoose = require("mongoose");
const error = require("../utils/error");
const class_one = require("../model/Routines/ClassRoutineOne");
const class_two = require("../model/Routines/ClassRoutineTwo");
const classModels = {
	class_one,
	class_two,
};
const postClassRoutineService = async (data, class_name) => {
	const ClassModel = classModels[class_name];
	const { routine, date, classId } = data;
	const periodArray = Object.keys(routine);

	let existRoutine = await ClassModel.findOne({ date });

	if (existRoutine) {
		const SM_ERROR = error(
			400,
			"Already Set Routine. You can update routine"
		);
		throw SM_ERROR;
	} else {
		// If routine for the date doesn't exist, create a new routine
		const newRoutine = {};
		periodArray.forEach(period => {
			newRoutine[period] = {
				...routine[period],
			};
		});

		const classRoutine = new ClassModel({
			date,
			classId,
			routine: newRoutine,
		});

		const savedClassRoutine = await classRoutine.save();
		return savedClassRoutine;

		// If routine for the date already exists, update specific periods
		// periodArray.forEach(period => {

		// 	existRoutine.routine.set(period, {
		// 		isHoliday:
		// 			userRoutineData.isHoliday || existingRoutineData.isHoliday,
		// 		startTime:
		// 			userRoutineData.startTime || existingRoutineData.startTime,
		// 		endTime: userRoutineData.endTime || existingRoutineData.endTime,
		// 		subjectId:
		// 			userRoutineData.subjectId || existingRoutineData.subjectId,
		// 		teacherId:
		// 			userRoutineData.teacherId || existingRoutineData.teacherId,
		// 	});
		// });

		// const savedClassRoutine = await existRoutine.save();
		// return savedClassRoutine;
	}
};

const updateClassRoutineService = async (body, query) => {
	const { date, class_name } = query;
	const ClassModel = classModels[class_name];
	const routineData = await ClassModel.findOne({ date });

	const periodArray = Object.keys(body);

	console.log(routineData, " exist");
	if (!routineData) {
		const SM_ERROR = error(
			404,
			"Data Nof Found. You must need to add before."
		);
		throw SM_ERROR;
	} else {
		// TODO: "apply condition for admin"

		periodArray.forEach(period => {
			const userRoutineData = body[period];

			const existingRoutineData = routineData?.routine?.get(period) || {}; // Get existing routine data or an empty object if not exist
			routineData?.routine?.set(period, {
				isHoliday:
					userRoutineData?.isHoliday ||
					existingRoutineData?.isHoliday,
				startTime:
					userRoutineData?.startTime ||
					existingRoutineData?.startTime,
				endTime:
					userRoutineData?.endTime || existingRoutineData?.endTime,
				subjectId:
					userRoutineData?.subjectId ||
					existingRoutineData?.subjectId,
				teacherId:
					userRoutineData?.teacherId ||
					existingRoutineData?.teacherId,
			});
		});

		await routineData.save();
	}
	return routineData;
};

const getClassRoutineService = async query => {
	const { class_name, date } = query;
	const ClassModel = classModels[class_name];

	// Parse the 'date' string into a Date object

	const routineData = await ClassModel.findOne({ date });

	if (!routineData) {
		const SM_ERROR = error(404, "Data Not Found");
		throw SM_ERROR;
	} else {
		const response = {
			message: "Successfully Fetch Class Routine",
			data: routineData,
			links: {
				self: `/class-routine?class_name=${class_name}&date=${date}`,
				nextRoutine: `/class-routine?class_name=${class_name}&date=${format(
					subDays(new Date(date), 1),
					"yyyy-MM-dd"
				)}`,
				prevRoutine: `/class-routine?class_name=${class_name}&date=${format(
					addDays(new Date(date), 1),
					"yyyy-MM-dd"
				)}`,
			},
		};
		return response;
	}
};

const deleteClassRoutineService = async query => {
	const { date, class_name } = query;
	const ClassModel = classModels[class_name];
	const isDelete = await ClassModel.deleteOne({ date });

	if (isDelete.deletedCount === 1) {
		const response = {
			message: "Home work deleted successfully",
		};
		return response;
	} else {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	}
};

module.exports = {
	postClassRoutineService,
	updateClassRoutineService,
	getClassRoutineService,
	deleteClassRoutineService,
};
