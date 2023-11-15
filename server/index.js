/** @format */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDoc = YAML.load("./swagger.yaml");
const app = express();
app.use([cors(), express.json()]);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
const connectDB = require("./db/db");
const router = require("./routers/index");
const PORT = process.env.PORT || 4000;

app.use(router);

app.use((err, _req, res, _next) => {
	const status = err.status || 500;
	const message = err.message || "something went occurred";
	res.status(status).json({
		status,
		message,
	});
});

connectDB()
	.then(
		console.log("database connect"),
		app.listen(PORT, () => {
			console.log("server is running on port 4000");
		})
	)
	.catch(e => {
		console.log(e);
	});
