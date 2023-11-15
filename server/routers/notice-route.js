/** @format */

const route = require("express").Router();
const {
	PostNotice,
	GetNotices,
	GetNotice,
	UpdateNotice,
	DeleteNotice,
} = require("../controller/notice-controller");

route.post("/notices", PostNotice);
route.get("/notices", GetNotices);
route.get("/notices/:id", GetNotice);
route.patch("/notices/:id", UpdateNotice);
route.delete("/notices/:id", DeleteNotice);

module.exports = route;
