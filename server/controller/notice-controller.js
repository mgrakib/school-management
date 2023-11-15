/** @format */

const {
	deleteNoticeService,
	getNoticeService,
	getNoticesService,
	postNoticeService,
	updateNoticeService,
} = require("../service/notice.service");
const PostNotice = async (req, res, next) => {
	try {
		const body = req.body;
		const response = await postNoticeService(body);
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};

const GetNotices = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await getNoticesService(query);

		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const GetNotice = async (req, res, next) => {
	try {
		const params = req.params;

		const response = await getNoticeService(params);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const UpdateNotice = async (req, res, next) => {
	try {
		const params = req.params;
		const body = req.body;
		const response = await updateNoticeService(params, body);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};
const DeleteNotice = async (req, res, next) => {
	try {
		const params = req.params;
		const response = await deleteNoticeService(params);
		res.status(203).json(response);
	} catch (e) {
		next(e);
	}
};

module.exports = {
	PostNotice,
	GetNotices,
	GetNotice,
	UpdateNotice,
	DeleteNotice,
};
