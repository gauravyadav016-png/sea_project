const { authJwt } = require("../middlewares");
const controller = require("../controllers/dashboard.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    // Create a new Tutorial
    app.post("/api/v1/dashboard/getfiles", controller.getfiles); 
   
};
