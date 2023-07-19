const mongoose = require("mongoose"); 

const ParticipateSchema={
    candidate_code: String,
    state_code: String,
    constitution_code: String,
    election_type_code: String,
    delete_status: Boolean,
    created_date: Date,
    updated_date: Date
};

const Participate = mongoose.model("candidate_participate_masters", ParticipateSchema);
module.exports = Participate;
