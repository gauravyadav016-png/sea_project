const mongoose = require("mongoose");
const ConstitutionSchema={
    state_code: String,
    constitution_code: String,
    constitution_name: String,
    delete_status: String,
    created_date: String,
    updated_date: String
};

const Constitution = mongoose.model("constitutions_masters",ConstitutionSchema); 

module.exports = Constitution;
