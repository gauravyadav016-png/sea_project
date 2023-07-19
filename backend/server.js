const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


const db = require("./app/models");
const Role = db.role;
// mongodb://evotingusr:TpeNAJwfHxhuyAcN@3.108.132.228:27036/?authMechanism=SCRAM-SHA-256&authSource=evoting
//local   mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}
db.mongoose
  .connect(`mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?authMechanism=${dbConfig.AUTHMECHANISM}&authSource=${dbConfig.AUTHSOURCE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //  initial();
    // testData();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to evoting application." });
});

// routes
require("./app/routes/apiGateway")(app); //api Gateway Loaded
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/electionType.routes")(app);
require("./app/routes/constitution.routes")(app);
require("./app/routes/participate.routes")(app);
require("./app/routes/votingmaster.routes")(app);
require("./app/routes/votinglog.routes")(app);
require("./app/routes/voterdrafts.routes")(app);
require("./app/routes/aadhar.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

// function testData(){
 
//   db.ElectionType.find({}, (err, dataList) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(dataList);
//     }
//   });

// }
