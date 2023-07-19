const { authJwt } = require("../middlewares");
const controller = require("../controllers/participate.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    }); 
     
    // Retrieve a single with id
    app.get("/api/v1/participate/getparticipate", controller.findAll); 
   
};