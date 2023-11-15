/** @format */

const router = require("express").Router();
const {
	AdmissionApply,
	GetAdmission,
	UpdateAdmission,
} = require("../controller/admission.controller");
router.post("/admission", AdmissionApply);
router.get("/admission/:id", GetAdmission);
router.patch("/admission/:id", UpdateAdmission);

module.exports = router;
