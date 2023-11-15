const {
	admissionRequestService,
	getAdmissionService,
	updateAdmissionService,
} = require("../service/admission.service");
const AdmissionApply = async(req, res, next) => {
    try {
        const data = req.body;
        const response = await admissionRequestService(data);
		res.status(201).json(response);
    } catch (e) {
        next(e)
    }
};

const GetAdmission = async (req, res, next) => {
    try {
        const id = req.params;
        const response = await getAdmissionService(id)
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
    
}

const UpdateAdmission = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body;
        const response = await updateAdmissionService(id, body);
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}


module.exports = {
	AdmissionApply,
	GetAdmission,
	UpdateAdmission,
};