const Votingmaster = require("../models/votingmaster.model"); 
const Votinglog = require("../models/votinglog.model");

// Create and Save a new Votingmaster
exports.create = (req, res) => {
     
    if (!req.body.voter_id || !req.body.candidate_code) {
        res.status(400).send({ status:"error",message: "voter_id or candidate_code field is missing!" });
        return;
    }else{
         
        const votingmasterNewData = new Votingmaster({
            voter_id:req.body.voter_id,
            candidate_code:req.body.candidate_code,
            state_code:req.body.state_code,
            constitution_code:req.body.constitution_code,
            election_type_code: req.body.election_type_code
        }); 
         
        votingmasterNewData.save().then(data => { 
            let date_ob = new Date();
            const votinglogData = new Votinglog({
                voter_id:req.body.voter_id,
                voted_datetime:date_ob,
                voter_ip:req.body.voter_ip,
                geo_coordinates:req.body.geo_coordinates,
                voting_status: req.body.voting_status,
                //ec_response: "test response"
            }); 
            votinglogData.save();
            //Votinglog.countDocuments();
            Votinglog.find({voting_status:"success"}).count().then((c)=>{
                //console.log('Votinglog', c)
                res.status(200).send({status:"success",totalvoted: c}); 
            }).catch(err => {
                res.status(500).send({
                    status:"fail",
                    message:
                    err.message || "Some error occurred while creating the Election Type."
                });
            }); 
        }).catch(err => {
            res.status(500).send({
                status:"fail",
                message:
                err.message || "Some error occurred while creating the Election Type."
            });
        });
    }

};

// Retrieve all Votingmaster from the database.
exports.findAll = (req, res) => {
    const delete_status = req.query.delete_status;
    var condition = delete_status? { delete_status: 0 } : {};
  
    Votingmaster.find({condition}).then(data => {
        console.log("testing findAll");
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data."
        });
    });
};

// Find a single Votingmaster with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Votingmaster.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Votingmaster with id " + id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Votingmaster with id=" + id });
    });
};

// Update a Votingmaster by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Votingmaster with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Votingmaster from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Votingmaster
exports.findAllPublished = async (req, res) => {

    try {
        await Votingmaster.find({}).then(data => {
            console.log("testing findAllPublished");
            console.log(data);
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data."
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }    
  
};