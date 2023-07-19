const Constitution = require("../models/constitution.model");
//https://www.bezkoder.com/node-express-mongodb-crud-rest-api/

// Create and Save a new Constitution
exports.create = (req, res) => {
  
};

// Retrieve all Constitution from the database.
exports.findAll = (req, res) => {
    const delete_status = req.query.delete_status;
    var condition = delete_status ? { delete_status: 0 } : {};
  
    Constitution.find({condition}).then(data => {
        //console.log("testing findAll");
        res.status(200).send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      });
  };

// Find a single Constitution with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Constitution.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Constitution with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Constitution with id=" + id });
      });
  };

// Update a Constitution by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Constitution with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Constitution from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Constitution
exports.findAllPublished = async (req, res) => {
  //const delete_status = req.query.delete_status;
  //var condition = delete_status ? { delete_status: "0" } : {};
   try {
    await Constitution.find({}).then(data => {
        //console.log("testing findAllPublished");
        //console.log(data);
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