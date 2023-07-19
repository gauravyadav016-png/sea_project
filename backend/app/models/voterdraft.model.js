const mongoose = require("mongoose");
 
const VoterdraftSchema={
    voter_id: String,
    voter_card_number: String,
    aadhar_number: String,
    voter_name: String,
    constitution_code: String,
    voter_card_file: String,
    aadhar_card_file: String,
    created_date:Date,
    draft_step:String,
    face_liveness:String,
    face_match_status:String,
    geo_address:String,
    latitude:String,
    longitude:String,
    mobile:String,
    verification_status:String
};

const Voterdraft = mongoose.model("voter_drafts",VoterdraftSchema);
module.exports = Voterdraft;
