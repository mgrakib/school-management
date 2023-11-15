/** @format */

const {
	postEventService,
	getEventsService,
	getEventService,
	updateEventService,
	deleteEventService
} = require("../service/event.service");
const PostEvent = async (req, res, next) => {
	try {
		const body = req.body;
		const response = await postEventService(body);
		res.status(201).json(response);
	} catch (e) {
		next(e);
	}
};

const GetEvents = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await getEventsService(query);

		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const GetEvent = async (req, res, next) => {
	try {
		const params = req.params;

		const response = await getEventService(params);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const UpdateEvent = async (req, res, next) => {
	try {
		const params = req.params;
		const body = req.body;
		const response = await updateEventService(params, body);
		res.status(200).json(response)
	} catch (e) {
		next(e)
	}
}
const DeleteEvent = async (req, res, next) => {
	try {
		const params = req.params;
		const response = await deleteEventService(params);
		res.status(203).json(response)
	} catch (e) {
		next(e)
	}
}
module.exports = {
	PostEvent,
	GetEvents,
	GetEvent,
	UpdateEvent,
	DeleteEvent,
};
