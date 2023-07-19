const { authJwt } = require("../middlewares");
const controller = require("../controllers/voterdraft.controller");
module.exports = function(app) {
      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
  
    // Create a new Tutorial
    app.post("/api/v1/voterdraft/add", controller.create);
  
    // Retrieve all published Tutorials
    app.get("/api/v1/voterdraft/published", controller.findAllPublished);

    // Retrieve all with condition
    app.get("/api/v1/voterdraft/all", controller.findAll);
  
    // Retrieve a single with id
    app.get("/api/v1/voterdraft/:id", controller.findOne);
  
    // Update with id
    app.put("/api/v1/voterdraft/:id", controller.update);
  
    // Delete a with id
    app.delete("/api/v1/voterdraft/:voter_id", controller.deleteAll);
  
    // Delete all 
    // app.delete("/api/v1/voterdraft/deleteall", controller.deleteAll);
  
   
  };