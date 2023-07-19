const db = require("../models");
const User = db.user;
const Role = db.role;


exports.findAll = (req, res) => {
  const delete_status = req.query.delete_status;
  var condition = delete_status ? { delete_status: 0 } : {};

  User.find().then(data => {
      //console.log("testing findAll");
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
