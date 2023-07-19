const mongoose = require("mongoose");

// const ElectionType = mongoose.model(
//     "election_type_master",
//     new mongoose.Schema({
//         election_type_code: String,
//         election_type_name: String,
//         delete_status: String,
//         created_date: String,
//         updated_date: String

//     },
//     { timestamps: true })
// );

const ElectionTypeSchema={
    election_type_code: String,
    election_type_name: String,
    delete_status: String,
    created_date: String,
    updated_date: String

};

const ElectionType = mongoose.model("election_type_masters",ElectionTypeSchema);

// ElectionType.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

  

module.exports = ElectionType;
