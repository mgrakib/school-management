/** @format */

const router = require("express").Router();
const admissionRoute = require("./admission-route");
const homeworkRoute = require("./homework-route");
const classRoutineRoute = require("./class-routine-route");
const eventRoute = require("./event-route");
const noticeRoute = require("./notice-route");
const subjectRoute = require("./subject.route");
const employRoute = require("./employ-route");

router.use("/api/v1", admissionRoute);
router.use("/api/v1", homeworkRoute);
router.use("/api/v1", classRoutineRoute);
router.use("/api/v1", eventRoute);
router.use("/api/v1", noticeRoute);
router.use("/api/v1", subjectRoute);
router.use("/api/v1", employRoute);

module.exports = router