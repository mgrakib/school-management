/** @format */

const Event = require("../model/Event");
const error = require("../utils/error");
const postEventService = async data => {
	const { title, body, isPublish, eventDate, createdDate } = data;

	const eventData = new Event({
		title,
		body,
		isPublish,
		eventDate,
		createdDate,
	});
	const newEvent = await eventData.save();
	const response = {
		message: "successfully created event",
		data: {
			...newEvent._doc,
		},
	};
	return response;
};

const getEventsService = async data => {
	let { page, limit, sortBy, sortType, search, status } = data;

	const intLimit = parseInt(limit);
	const intPage = parseInt(page);
	let eventArray = await Event.find();

	let modifyArray = noticeArray.filter(event => event.status === status);

	if (sortType === "asc") {
		modifyArray.sort((a, b) => {
			if (a[sortBy] > b[sortBy]) return 1;
			if (a[sortBy] < b[sortBy]) return -1;
			return 0;
		});
	}
	if (sortType === "des") {
		modifyArray.sort((a, b) => {
			if (b[sortBy] > a[sortBy]) return 1;
			if (b[sortBy] < a[sortBy]) return -1;
			return 0;
		});
	}

	if (search) {
		modifyArray = modifyArray.filter(event => {
			return event.title.includes(search);
		});
	}

	const skip = intPage * intLimit - intLimit;
	modifyArray = modifyArray.slice(skip, skip + intLimit);
	const totalPage = eventArray.length / intLimit;
	const totalItem = eventArray.length;

	const response = {
		message: "fetch data successfully",
		data: modifyArray,
		links: {
			self: `/events?page=${intPage}&limit=${intLimit}&sortBy=${sortBy}&sortType=${sortType}`,
		},
	};

	if (intPage > 1) {
		response.links.prev = `/events?page=${
			intPage - 1
		}&limit=${intLimit}&sortBy=${sortBy}&sortType=${sortType}`;
	}
	if (totalPage > intPage) {
		response.links.next = `/events?page=${
			intPage + 1
		}&limit=${intLimit}&sortBy=${sortBy}&sortType=${sortType}`;
	}

	return response;
};

const getEventService = async query => {
	const { id } = query;
	const eventData = await Event.findById(id);
	if (!id) {
		const SM_ERROR = error(400, "Expect id but got null");
		throw SM_ERROR;
	}
	if (!eventData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		const response = {
			message: "fetch event data successful",
			data: eventData,
		};
		return response;
	}
};
const updateEventService = async (params, data) => {
	const { id } = params;
	const { title, body, status, eventDate } = data;
	const eventData = await Event.findById(id);
	if (!eventData) {
		const SM_ERROR = error(404, "Data Not Found");
		throw SM_ERROR;
	} else {
		eventData.title = title || eventData.title;
		eventData.body = body || eventData.body;
		eventData.status = status || eventData.status;
		eventData.eventDate = eventDate || eventData.eventDate;

		const newEvent = await eventData.save();
		const response = {
			message: "update successfully",
			data: newEvent,
		};

		return response;
	}
	return data;
};
const deleteEventService = async query => {
	const { id } = query;
	const deleteValue = await Event.deleteOne({ _id: id });
	if (deleteValue.deletedCount < 1) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		const response = {
			message: "data delete successful",
		};
		return response;
	}
	return query;
};
module.exports = {
	postEventService,
	getEventsService,
	getEventService,
	updateEventService,
	deleteEventService,
};
