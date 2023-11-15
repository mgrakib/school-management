/** @format */

const {
	postClassRoutineService,
	updateClassRoutineService,
	getClassRoutineService,
	deleteClassRoutineService,
} = require("../service/class-routine.service");

const PostClassRoutine = async (req, res, next) => {
	try {
		const body = req.body;

		const { period } = req.query;
		const { class_name } = req.query;
		const response = await postClassRoutineService(
			body,
			class_name,
			period
		);
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};
const UpdateClassRoutine = async (req, res, next) => {
	try {
		const query = req.query;
		const body = req.body;

		const response = await updateClassRoutineService(body, query);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};
const GetClassRoutine = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await getClassRoutineService(query);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const DeleteClassRoutine = async (req, res, next) => {
	try {
		const query = req.query;
        const response = await deleteClassRoutineService(query);
        
        res.status(203).json(response);
        
	} catch (e) {
		next(e);
	}
};

module.exports = {
	PostClassRoutine,
	UpdateClassRoutine,
	GetClassRoutine,
	DeleteClassRoutine,
};
