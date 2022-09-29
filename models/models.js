const mongoose = require("mongoose");
const schemas = require("./schemas");

// ** User model
exports.User = new mongoose.model("User", schemas.userSchema);
// ** issues model
exports.Issue = new mongoose.model("Issue", schemas.issueSchema);
