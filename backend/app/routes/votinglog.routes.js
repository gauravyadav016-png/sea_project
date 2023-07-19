const { authJwt } = require("../middlewares");
const controller = require("../controllers/votinglog.controller");
module.exports = function(app) {
      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
   
   

    // Retrieve all with condition
    app.get("/api/v1/votinglog/all", controller.findAll);
   
      
  };