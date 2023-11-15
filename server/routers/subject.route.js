const route = require('express').Router()
const { PostSubject, GetSubject, DeleteSubject, UpdateSubject} = require("../controller/subject-controller.js");
route.post("/subjects", PostSubject);
route.get("/subjects", GetSubject);
route.delete("/subjects", DeleteSubject);
route.patch("/subjects", UpdateSubject);
 

module.exports  = route