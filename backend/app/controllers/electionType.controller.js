const ElectionType = require("../models/electionType.model"); 
// Create and Save a new ElectionType
exports.create = (req, res) => {
    // Validate request
    if (!req.body.electionTypeCode || !req.body.electionTypeName) {
        res.status(400).send({ status:"error",message: "electionTypeCode or electionTypeName field is missing!" });
        return;
    }else{
        // Create a Election Type
        const electionTypeNewData = new ElectionType({
        election_type_code: req.body.electionTypeCode,
        election_type_name: req.body.electionTypeName,
        delete_status: 0,
        created_date:"",
        updated_date:""
        });

        // Save Election Type in the database
        ElectionType.save(electionTypeNewData).then(data => {
        res.status(200).send({status:"success",data});
        })
        .catch(err => {
        res.status(500).send({
            status:"fail",
            message:
            err.message || "Some error occurred while creating the Election Type."
        });
        });
    }

};

// Retrieve all ElectionType from the database.
exports.findAll = (req, res) => {
    const delete_status = req.query.delete_status;
    var condition = delete_status? { delete_status: 0 } : {};
  
    ElectionType.find({condition})
      .then(data => {
        console.log("testing findAll");
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      });
  };

// Find a single ElectionType with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ElectionType.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found ElectionType with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving ElectionType with id=" + id });
      });
  };

// Update a ElectionType by the id in the request
exports.update = (req, res) => {
  
};

// Delete a ElectionType with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all ElectionType from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published ElectionType
exports.findAllPublished = async (req, res) => {

   try {
    await ElectionType.find({})
      .then(data => {
        console.log("testing findAllPublished");
        console.log(data);
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }    
  
};