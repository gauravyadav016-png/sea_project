const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const crypto = require("crypto");
const axios = require("axios");
const multer = require('multer');
require('dotenv').config();
const fs = require('fs');
const FormData = require('form-data');

const FaceMatchAPIURL=process.env.FACEMATCHINGAPIURL;
const GeoAPIURL=process.env.GEOAPIURL; // define URLS from env
const aadharAPIURL=process.env.AADHARAPIURL; // Aadhar ENV URL
const voterAPIURL=process.env.VOTERAPIURL; // Voter ENV URL

// Set up multer middleware to parse file uploads
// const storage = multer.memoryStorage(); //buffer storage
// const upload = multer({ storage: storage }); //buffer storage

//store file with exact name and extention
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + Date.now() + ext);
//   }
// });
// const upload = multer({ storage: storage });
//store file with exact name and extention ends

const upload = multer({ dest: 'uploads/' }); //upload file with temp name 

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  

  function validateKey(req, res, next) {
    const apiKey = req.get('X-Api-Key');
    const apiSecret = req.get('X-Api-Secret');
    // console.log(apiKey,apiSecret);
    // console.log("GeoAPIURL",GeoAPIURL);
    if (!apiKey && !apiSecret || apiSecret==undefined) {
      return res.status(401).send({ error: 'Unauthorized - Missing API key or secret' });
    }else{

      const apiKeyMap = {
        "your_api_key_1": "your_api_secret_1",
        "your_api_key_2": "your_api_secret_2",
        "EYk49vYKWnLAGyhuQaCg2TroovlD9bVp":"aesLUY86mku8fXQ9wDHQQhYKxP9ssgyPu3cH1gaHKvH7mKRjHJGcVhmcHBpIqUna",
        // Add more API keys and secrets as needed
      };
      const expectedApiSecret = apiKeyMap[apiKey];
  
      if (!expectedApiSecret || !crypto.timingSafeEqual(Buffer.from(apiSecret), Buffer.from(expectedApiSecret))) {
          return res.status(401).send({ error: "Unauthorized: Incorrect API Key or API Secret" });
        }
      // Validate the API key and secret against a database or some other source
      
      next();

    }
  }

app.get("/v1/api/GeoAPIURL",validateKey, async (req, res) => {
  try {
      const response = await axios.get(GeoAPIURL, {
          headers: {
              // "X-Api-Key": process.env.API_KEY,
              // "X-Api-Secret": process.env.API_SECRET
          }
      });
      res.send(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});

app.get("/v1/api/aadharOCR",validateKey, async (req, res) => {
  try {
      const response = await axios.get(aadharAPIURL, {
          headers: {
              // "X-Api-Key": process.env.API_KEY,
              // "X-Api-Secret": process.env.API_SECRET
          }
      });
      res.send(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});

app.get("/v1/api/voterOCR",validateKey, async (req, res) => {
  try {
      const response = await axios.get(voterAPIURL, {
          headers: {
              // "X-Api-Key": process.env.API_KEY,
              // "X-Api-Secret": process.env.API_SECRET
          }
      });
      res.send(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});

app.post("/v1/api/faceMatching",validateKey, async (req, res) => {
  try {
    
    // const file = req.file;
    const formData = new FormData();
    
    // upload.single('matchFile')(req, res, function (err) {
    //   if (err) {
    //     // Handle error
    //     console.log(err);
    //     return res.status(400).json({ message: 'Error uploading Match file' });
    //   } else {
    //     // File uploaded successfully
    //     const file = req.file;
    //     formData.append('matchFile', file);
    //     console.log(file);
    //     console.log("formData-->",formData);
    //     return res.status(200).json({ message: 'File uploaded successfully' });
    //   }
    // });

    upload.fields([
      { name: 'file', maxCount: 1 },
      { name: 'matchFile', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        // Handle error
        return res.status(400).json({ error: err.message });
      } else {
        const file = req.files['file'][0];
        const matchFile = req.files['matchFile'][0];

        formData.append('file', fs.createReadStream(file.path), {
          filename: 'file.jpg',
          contentType: 'image/jpeg'
        });
        formData.append('matchFile', fs.createReadStream(matchFile.path),{
          filename: 'matchFile.jpg',
          contentType: 'image/jpeg'
        });


        // formData.append('file', file);
        // formData.append('matchFile', matchFile);
         console.log("file-->", file);
        // console.log("matchFile-->", matchFile);
        console.log("formData--->", formData);
    
        axios.post(FaceMatchAPIURL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if(response){
            //Code to remove the temp file from folder
            fs.unlink(file.path, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });  

            fs.unlink(matchFile.path, (err) => {
              if (err) {
                console.error(err);
                return;
              }
            });  
            //Code to remove the temp file from folder
          }
          res.send(response.data);
        })
        .catch(error => {
          // Handle error
          return res.status(400).json({ error: error.message });
        });
      }
    });
        

      // console.log("checking here--->",req.body);

      // const file = req.files.file; 
      // const matchFile= req.files.matchFile;
      // 
      // 
      // formData.append('matchFile', matchFile);
      
      // const response = await axios.post(FaceMatchAPIURL,formData, {
      //     headers: {
      //         // "X-Api-Key": process.env.API_KEY,
      //         // "X-Api-Secret": process.env.API_SECRET
      //     }
      // });
      // res.send(response.data);
      // res.send(JSON.stringify(req));
      // return JSON.parse(req)
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});








};
