/** @format */
const {
	getAllHomeWorkService,
	getSingleHomeWorkService,
	postHomeworkService,
	updateHomeWorkService,
	deleteHomeWorkService,
} = require("../service/homework.service");

const GetAllHomework = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await getAllHomeWorkService(query);
		res.status(200).json(response)
	} catch (e) {
		next(e);
	}
};

const GetSingleHomework = async (req, res, next) => {
	try {
		const { id } = req.params;
		const response = await getSingleHomeWorkService(id);
		res.status(200).json(response)
	} catch (e) {
		next(e)
	}
}
const AssignHomework = async (req, res, next) => {
	try {
		const data = req.body;

		const response = await postHomeworkService(data);
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};

const EditHomeWork = async (req, res, next) => {
	try {
		const query = req.query;
		const params = req.params;

		const body = req.body;

		const response = await updateHomeWorkService({
			...query,
			...params,
			body,
		});
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const DeleteHomeWork = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { t_id } = req.query;

		const response = await deleteHomeWorkService(id, t_id);
		res.status(203).json(response);
	} catch (e) {
		next(e);
	}
};

module.exports = {
	GetAllHomework,
	GetSingleHomework,
	AssignHomework,
	EditHomeWork,
	DeleteHomeWork,
};
