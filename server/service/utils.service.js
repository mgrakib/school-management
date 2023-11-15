/** @format */
const error = require('../utils/error')
const updateField = async(
	Model,
	findByKey,
	findByValue,
	updateByKey,
	updateByValue
) => {
    let data;
    if (findByKey === 'id') {
        data =  await Model.findById({_id: findByValue})
    } else {
        data = await Model.findOne({[findByKey]: findByValue});
    }

    if (!data) {
        const SM_ERROR = error(404, "Data not found");
		throw SM_ERROR;
    } else {
         data[updateByKey] = updateByValue;
			await data.save();
			return data;
    }
   
};


module.exports = {
	updateField,
};
