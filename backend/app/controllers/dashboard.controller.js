const Participate = require("../models/participate.model"); 
const Statemaster = require("../models/statemaster.model"); 
const Candidatemaster = require("../models/candidatemaster.model"); 
const Constitution = require("../models/constitution.model.js"); 
const ElectionType = require("../models/electionType.model"); 
const Votingmaster = require("../models/votingmaster.model"); 
const Votinglog = require("../models/votinglog.model");
const Voterdraft = require("../models/voterdraft.model"); 

const multer = require('multer');

exports.findAll = (req, res) => {
    const delete_status = req.query.delete_status;
    var condition = delete_status ? { delete_status: 0 } : {};
  
    Constitution.find({condition}).then(data => { 
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving data."
        });
    });
};
 
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Constitution.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Constitution with id " + id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Constitution with id=" + id });
    });
};
 
exports.findAllPublished = async (req, res) => {
  
   try {
        await Constitution.find({}).then(data => {
            
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

exports.getfiles = async (req, res) => {

    let uploadFile = multer({
        storage: storage,  // adding limits
        limits: { fileSize: "24mb" }
    }).single("file");
  
    console.log("files", uploadFile)
};
