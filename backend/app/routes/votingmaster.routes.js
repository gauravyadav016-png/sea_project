const { authJwt } = require("../middlewares");
const controller = require("../controllers/votingmaster.controller");
module.exports = function(app) {
      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
  
    // Create a new Tutorial
    app.post("/api/v1/votingmaster/add", controller.create);
  
    // Retrieve all published Tutorials
    app.get("/api/v1/votingmaster/published", controller.findAllPublished);

    // Retrieve all with condition
    app.get("/api/v1/votingmaster/all", controller.findAll);
  
    // Retrieve a single with id
    app.get("/api/v1/votingmaster/:id", controller.findOne);
  
    // Update with id
    app.put("/api/v1/votingmaster/:id", controller.update);
      
  };