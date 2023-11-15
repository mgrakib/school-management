/** @format */
const bcrypt = require("bcrypt");
const Employ = require("../model/Employ");
const error = require("../utils/error");
const createEmployService = async data => {
	const { email, password, role, department, address, image, subject } = data;
	const isExistEmploy = await Employ.findOne({ email });

	if (isExistEmploy) {
		const SM_ERROR = error(400, "Employ Is Already Exist");
		throw SM_ERROR;
	} else {
		// const hashPass = await bcrypt.hash(password, 10);
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const employ = new Employ({
			email,
			password: hashPassword,
			role,
			department,
			subject,
			address,
			image,
			priority:
				role === "Head Teacher"
					? 1
					: role === "Ass. Head Teacher"
					? 2
					: role === "Teacher"
					? 3
					: 99,
		});
		const employValue = await employ.save();
		const response = {
			message: "Created Employ Successful",
			employValue,
		};
		return response;
	}
};

const getEmployService = async data => {
	const { page, limit, role, dep, subject } = data;
	const employs = await Employ.find();
	let priorityEmploy = employs.sort((a, b) => {
		if (a?.priority > b?.priority) {
			return 1;
		} else if (a?.priority < b?.priority) {
			return -1;
		} else {
			return 0;
		}
	});

	if (role) {
		priorityEmploy = priorityEmploy.filter(employ => employ.role === role);
	}
	if (dep) {
		priorityEmploy = priorityEmploy.filter(employ =>
			employ.department.includes(dep)
		);
	}
	if (subject) {
		priorityEmploy = priorityEmploy.filter(employ =>
			employ.subject.includes(subject)
		);
	}

	// pagination
	const pageInit = parseInt(page);
	const limitInit = parseInt(limit);
	const totalPage = employs.length / limitInit;
	const skip = pageInit * limitInit - limitInit;
	const employsList = priorityEmploy.slice(skip, limitInit + skip);
	const response = {
		message: "All Employs",
		employsList,
		totalPage,
		links: {
			self: `http://localhost:4000/api/v1/employs?page=${
				pageInit ?? ""
			}&limit=${limitInit ?? ""}&role=${role ?? ""}&dep=${
				dep ?? ""
			}&subject=${subject ?? ""}`,
		},
	};

	if (totalPage > pageInit) {
		response.links.next = `http://localhost:4000/api/v1/employs?page=${
			pageInit + 1 ?? ""
		}&limit=${limitInit ?? ""}&role=${role ?? ""}&dep=${
			dep ?? ""
		}&subject=${subject ?? ""}`;
	}
	if (pageInit > 1) {
		response.links.prev = `http://localhost:4000/api/v1/employs?page=${
			pageInit - 1 ?? ""
		}&limit=${limitInit ?? ""}&role=${role ?? ""}&dep=${
			dep ?? ""
		}&subject=${subject ?? ""}`;
	}
	return response;
};
const getSingleEmployService = async data => {
	const { id } = data;
	const employData = await Employ.findById(id);
	if (!employData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	} else {
		const response = {
			message: "Fetch Employ Data Successfully",
			data: {
				...employData._doc,
			},
		};
		return response;
	}
};
const deleteEmployService = async data => {
	const { id } = data;
	const isDeleted = await Employ.deleteOne({ _id: id });
	if (isDeleted.deletedCount > 0) {
		const response = {
			message: "Successfully Deleted",
			status: "203",
		};

		return response;
	} else {
		const SM_ERROR = error(400, "Data not found");
		throw SM_ERROR;
	}
};
const editEmployInfoService = async ({ id }, data) => {
	const { oldPassword, password, role, address, image } = data;

	const employInfo = await Employ.findById(id);
	if (!employInfo) {
		const SM_ERROR = error(404, "Data not found ");
		throw SM_ERROR;
	} else {
		employInfo.role = role || employInfo.role;
		employInfo.address = address || employInfo.address;
		employInfo.image = image || employInfo.image;
		employInfo.priority =
			role === "Head Teacher"
				? 1
				: role === "Ass. Head Teacher"
				? 2
				: role === "Teacher"
				? 3
				: 99;

		// TODO: change password
		const updateEmploy = await employInfo.save();
		const response = {
			message: "Successfully Employ Update",
			data: {
				...updateEmploy._doc,
			},
		};

		return response;
	}
};

const addEmployArrayService = async ({ value, field_key }, { id }) => {
	const employData = await Employ.findById(id);
	if (!employData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	}
	if (field_key !== "department" && field_key !== "subject") {
		const SM_ERROR = error(400, "Provide Valid data");
		throw SM_ERROR;
	} else {
        if (employData[field_key].includes(value)) {
            const SM_ERROR = error(400, `Already Exist ${value} in the ${field_key}`);
			throw SM_ERROR;
        } else {
            employData[field_key].push(value);
		const updateEmployData = await employData.save();
		const response = {
			message: `Successfully Add ${field_key}`,
			data: {
				...updateEmployData._doc,
			},
		};
		return response;
        }
	}
};

const deleteEmployArrayItemService = async ({ value, field_key }, { id }) => {
	const employData = await Employ.findById(id);
	if (!employData) {
		const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
	}
	if (field_key !== "department" && field_key !== "subject") {
		const SM_ERROR = error(400, "Provide Valid data");
		throw SM_ERROR;
	} else {
		if (!employData[field_key].includes(value)) {
			const SM_ERROR = error(
				400,
				`Already Exist ${value} in the ${field_key}`
			);
			throw SM_ERROR;
		} else {
			const newArray = employData[field_key].filter(
				item => item !== value
			);
			employData[field_key] = newArray;
			const updateEmployData = await employData.save();
			const response = {
				message: `Successfully Add ${field_key}`,
				data: {
					...updateEmployData._doc,
				},
			};
			return response;
		}
	}
};
module.exports = {
	createEmployService,
	getEmployService,
	deleteEmployService,
	getSingleEmployService,
	editEmployInfoService,
	addEmployArrayService,
	deleteEmployArrayItemService,
};
