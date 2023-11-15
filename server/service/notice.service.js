/** @format */

const Notice =  require('../model/Notice')
const error = require("../utils/error");
const postNoticeService = async data => {
	const { title, body, isPublish, noticeDate, createdDate } = data;

	const noticeData = new Notice({
		title,
		body,
		isPublish,
		noticeDate,
		createdDate,
    });
    
    const newNotice = await noticeData.save();
    
	const response = {
		message: "successfully created notice",
		data: {
			...newNotice._doc,
		},
	};
	return response;
};

const getNoticesService = async data => {
	let { page, limit, sortBy, sortType, search, status } = data;

	const intLimit = parseInt(limit);
	const intPage = parseInt(page);
	let noticeArray = await Notice.find();

    // TODO: check role 
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
		modifyArray = modifyArray.filter(notice => {
			return notice.title.includes(search);
		});
	}

	const skip = intPage * intLimit - intLimit;
	modifyArray = modifyArray.slice(skip, skip + intLimit);
	const totalPage = noticeArray.length / intLimit;
	const totalItem = noticeArray.length;

	const response = {
		message: "fetch data successfully",
		data: modifyArray,
		links: {
			self: `/notices?page=${intPage}&limit=${intLimit}&sortBy=${sortBy}&sortType=${sortType}`,
		},
	};

	if (intPage > 1) {
		response.links.prev = `/notices?page=${
			intPage - 1
		}&limit=${intLimit}&sortBy=${sortBy}&sortType=${sortType}`;
	}
	if (totalPage > intPage) {
		response.links.next = `/notices?page=${
			intPage + 1
		}&limit=${intLimit}&sortBy=${sortBy}&sortType=${sortType}`;
	}

	return response;
};

const getNoticeService = async query => {
	const { id } = query;
	const noticeData = await Notice.findById(id);
	if (!id) {
		const SM_ERROR = error(400, "Expect id but got null");
		throw SM_ERROR;
	}
	if (!noticeData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		const response = {
			message: "fetch notice data successful",
			data: noticeData,
		};
		return response;
	}
};
const updateNoticeService = async (params, data) => {
	const { id } = params;
	const { title, body, status, noticeDate } = data;
	const noticeData = await Notice.findById(id);
	if (!noticeData) {
		const SM_ERROR = error(404, "Data Not Found");
		throw SM_ERROR;
	} else {
		noticeData.title = title || noticeData.title;
		noticeData.body = body || noticeData.body;
		noticeData.status = status || noticeData.status;
		noticeData.noticeDate = noticeDate || noticeData.noticeDate;

		const newNotice = await noticeData.save();
		const response = {
			message: "update successfully",
			data: newNotice,
		};

		return response;
	}
	return data;
};
const deleteNoticeService = async query => {
	const { id } = query;
	const deleteValue = await Notice.deleteOne({ _id: id });
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
	postNoticeService,
	getNoticesService,
	getNoticeService,
	updateNoticeService,
	deleteNoticeService,
};
