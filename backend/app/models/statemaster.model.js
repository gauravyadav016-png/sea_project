const mongoose = require("mongoose"); 

const StatemasterSchema={
    state_code: String,
    state_name: String,
    delete_status: Boolean,
    created_date: Date,
    updated_date: Date
};

const Statemaster = mongoose.model("state_masters", StatemasterSchema);
module.exports = Statemaster;
