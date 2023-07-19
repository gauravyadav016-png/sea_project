const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.ElectionType=require("./electionType.model");
db.Constitution=require("./constitution.model");
db.Statemaster=require("./statemaster.model");
db.Candidatemaster=require("./candidatemaster.model");
db.Votingmaster=require("./votingmaster.model");
db.Votinglog=require("./votinglog.model");
db.Voterdraft=require("./voterdraft.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
