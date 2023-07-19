const Votingmaster = require("../models/votingmaster.model"); 
const Votinglog = require("../models/votinglog.model");
 
// Retrieve all Votinglog from the database.
exports.findAll = (req, res) => {
    const delete_status = req.query.delete_status;
    var condition = delete_status? { delete_status: 0 } : {};
    var voter_id = req.query.voter_id;
    Votinglog.find({voter_id:voter_id}).then(data => {
        console.log("testing findAll");
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data."
        });
    });
};
