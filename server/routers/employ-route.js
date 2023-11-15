const {
	CreateEmploy,
	GetEmploys,
	DeleteEmploy,
	GetSingleEmploy,
	EditEmployInfoService,
	AddEmployArrayValue,
	DeleteEmployArrayItem,
} = require("../controller/employ-controller");
const route = require('express').Router();

route.post("/employs", CreateEmploy);
route.get("/employs", GetEmploys);
route.delete("/employs/:id", DeleteEmploy);
route.get("/employs/:id", GetSingleEmploy);
route.patch("/employs/:id", EditEmployInfoService);
route.patch("/employs/department/:id", AddEmployArrayValue);
route.delete("/employs/department/:id", DeleteEmployArrayItem);

module.exports = route