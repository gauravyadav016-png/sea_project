const mongoose = require("mongoose");
 
const VotinglogSchema={
    voter_id: String, 
    voted_datetime:Date,
    voter_ip:String,
    geo_coordinates:String,
    voting_status:String,
    ec_response:String 
};

const Votinglog = mongoose.model("voting_logs",VotinglogSchema); 

module.exports = Votinglog;
