/** @format */

const {
	postSubjectService,
	getSubjectService,
	deleteSubjectService,
	updateSubjectService,
} = require("../service/subject.service");

const PostSubject = async (req, res, next) => {
	try {
		const body = req.body;
		const response = await postSubjectService(body);
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};

const GetSubject = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await getSubjectService(query);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};
const DeleteSubject = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await deleteSubjectService(query);
		res.status(203).json(response);
	} catch (e) {
		next(e);
	}
};

const UpdateSubject = async (req, res, next) => {
	try {
		const body = req.body;
		const response = await updateSubjectService(body);
		res.status(200).json(response);
	} catch (e) {}
};
module.exports = {
	PostSubject,
	GetSubject,
	DeleteSubject,
	UpdateSubject,
};
