/** @format */

const {
	createEmployService,
	getEmployService,
	deleteEmployService,
	getSingleEmployService,
	editEmployInfoService,
	addEmployArrayService,
	deleteEmployArrayItemService,
} = require("../service/employ.service");

const CreateEmploy = async (req, res, next) => {
	try {
		const body = req.body;
		const response = await createEmployService(body);
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};

const GetEmploys = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await getEmployService(query);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};
const GetSingleEmploy = async (req, res, next) => {
	try {
		const params = req.params;
		const response = await getSingleEmployService(params);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};
const DeleteEmploy = async (req, res, next) => {
	try {
		console.log(req);
		const params = req.params;
		const response = await deleteEmployService(params);
		res.status(203).json(response);
	} catch (e) {
		next(e);
	}
};
const EditEmployInfoService = async (req, res, next) => {
	try {
		const params = req.params;
		const body = req.body;
		const response = await editEmployInfoService(params, body);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};
const AddEmployArrayValue = async (req, res, next) => {
	try {
		const query = req.query;
		const params = req.params;
		const response = await addEmployArrayService(query, params);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const DeleteEmployArrayItem = async (req, res, next) => {
    try {
		const query = req.query;
		const params = req.params;
		const response = await deleteEmployArrayItemService(query, params);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
}
module.exports = {
	CreateEmploy,
	GetEmploys,
	DeleteEmploy,
	GetSingleEmploy,
	EditEmployInfoService,
	AddEmployArrayValue,
	DeleteEmployArrayItem,
};
