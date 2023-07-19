const Voterdraft = require("../models/voterdraft.model"); 
const CryptoJS = require("crypto-js");
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS=(voter_id,mob_no)=>{
  client.messages
  .create({
     body: 'Evoting Link API:'+"http://localhost:3000/evoting/"+voter_id,
     from: '+'+process.env.TWILIO_PHONE_NO,
     to: mob_no
   })
  .then(message => console.log(message.sid));
}

// Create and Save a new Voterdraft
exports.create = (req, res) => {
    // Validate request
    if (!req.body.voter_id || !req.body.voter_name) {
        res.status(400).send({ status:"error",message: "voter id or voter name field is missing!" });
        return;
    }else{
        // Create a Voter Details

        var myquery = { voter_id:req.body.voter_id }; 
        Voterdraft.deleteMany(myquery).then(result=>{ 
            if (result.deletedCount > 0) { 
                console.log("Successfully deleted one document."); 
            } else { 
                console.log("No documents matched the query. Deleted 0 documents."); 
            }
        });  

        const voterdraftNewData = new Voterdraft({
            voter_id:req.body.voter_id,
            voter_card_number: req.body.voter_card_number,
            aadhar_number: req.body.aadhar_number,
            voter_name:req.body.voter_name,
            constitution_code:req.body.constitution_code,
            voter_card_file:req.body.voter_card_file,
            aadhar_card_file:req.body.aadhar_card_file,
            created_date:req.body.created_date, 
            draft_step:req.body.draft_step, 
            face_liveness:req.body.face_liveness,
            face_match_status:req.body.face_match_status, 
            geo_address:req.body.geo_address, 
            latitude:req.body.latitude, 
            longitude:req.body.longitude, 
            mobile:req.body.mobile, 
            verification_status:req.body.verification_status
        });

        //Save voter details in the database
        voterdraftNewData.save(voterdraftNewData).then(data => {
          const VoterNo = CryptoJS.AES.encrypt(req.body.voter_card_number, process.env.SECRET_KEY).toString();
            sendSMS(VoterNo,req.body.mobile);
            res.status(200).send({status:"success",data});
        }).catch(err => {
            res.status(500).send({
                status:"fail",
                message:
                err.message || "Some error occurred while creating the Voter Details."
            });
        });
    }

};

// Retrieve all Voterdraft from the database.
exports.findAll = (req, res) => {
    const delete_status = req.query.delete_status;
    var condition = delete_status? { delete_status: 0 } : {};

    Voterdraft.find({condition}).then(data => {
        console.log("testing findAll");
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

// Find a single Voterdraft with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("Q",id);
    // sendSMS("MNBBJ89BJJBK","+919789176467");
    Voterdraft.find({voter_card_number:id})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Voterdraft with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Voterdraft with id=" + id });
      });
  };

// Update a Voterdraft by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Voterdraft with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Voterdraft from the database.
exports.deleteAll = (req, res) => {
    console.log('q', req.query)
  if (!req.query.voter_id ) {
      res.status(400).send({ status:"error",message: "voter id is missing!" });
      return;
  }else{ 
      var myquery = { voter_id:req.query.voter_id }; 
      Voterdraft.deleteMany(myquery).then(result=>{ 
        if (result.deletedCount > 0) { 
          console.log("Successfully deleted one document."); 
          res.status(200).send({status:"success", message:'Successfully deleted one document.'});
        } else { 
          console.log("No documents matched the query. Deleted 0 documents."); 
          res.status(500).send({status:"error",  message:'No documents matched the query. Deleted 0 documents.' });
        }
      });  
  }
};

// Find all published Voterdraft
exports.findAllPublished = async (req, res) => {

   try {
    await Voterdraft.find({})
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