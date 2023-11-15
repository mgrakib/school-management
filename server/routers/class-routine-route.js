/** @format */

const route = require("express").Router();

const {
	PostClassRoutine,
	UpdateClassRoutine,
	GetClassRoutine,
	DeleteClassRoutine,
} = require("../controller/class-routine-controller");

route.post("/class-routine", PostClassRoutine);
route.patch("/class-routine", UpdateClassRoutine);
route.get("/class-routine", GetClassRoutine);
route.delete("/class-routine", DeleteClassRoutine);

module.exports = route;
