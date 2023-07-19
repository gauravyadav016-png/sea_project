const mongoose = require("mongoose");
 
const VotingmasterSchema={
    voter_id: String, 
    candidate_code:String,
    state_code:String,
    constitution_code:String,
    election_type_code:String,
    created_datetime:Date,
    updated_date:Date,
    status:Boolean 
};

const Votingmaster = mongoose.model("voting_masters",VotingmasterSchema); 

module.exports = Votingmaster;
