const route = require('express').Router()
const {
	PostEvent,
	GetEvents,
	GetEvent,
	UpdateEvent,
	DeleteEvent,
} = require("../controller/event-controller");

route.post("/events", PostEvent);
route.get("/events", GetEvents);
route.get("/events/:id", GetEvent);
route.patch("/events/:id", UpdateEvent);
route.delete("/events/:id", DeleteEvent);

module.exports = route