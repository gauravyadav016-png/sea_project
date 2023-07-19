const mongoose = require("mongoose"); 

const CandidatemasterSchema={
    candidate_code: String,
    candidate_name: String,
    symbol: String,
    manifisto: String,
    state_code: String,
    party_name: String,
    delete_status: Boolean,
    created_date: Date,
    updated_date: Date
};

const Candidatemaster = mongoose.model("candidate_masters", CandidatemasterSchema);
module.exports = Candidatemaster;
