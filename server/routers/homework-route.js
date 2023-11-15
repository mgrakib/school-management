/** @format */

const router = require("express").Router();

const {
	GetAllHomework,
	GetSingleHomework,
	AssignHomework,
	EditHomeWork,
	DeleteHomeWork,
} = require("../controller/homework.controller");

router.get("/homeworks", GetAllHomework);
router.get("/homeworks/:id", GetSingleHomework);
router.post("/homeworks", AssignHomework);
router.patch(`/homeworks/:id`, EditHomeWork);
router.delete(`/homeworks/:id`, DeleteHomeWork);

module.exports = router;
