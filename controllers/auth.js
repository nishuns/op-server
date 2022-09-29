const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/models");
require("dotenv").config;

/**
 *  @description for login
 *  @method POST /userlogin
 */
exports.userlogin = (req, res) => {
    console.log(req.body);
   User.findOne({ email: req.body.email })
      .then((user) => {
         if (!user) {
            return res
               .status(404)
               .json({ error: "Invalid email and password!" });
         }
         bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
               if (valid) {
                  const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET);
                  const { _id, firstName, lastName, username, email } = user;
                  return res.json({
                     stat: "success",
                     token,
                     user: { _id, firstName, lastName, username, email }
                  });
               } else {
                  return res.status(400).json({
                     stat: "failure",
                     error: "Invalid Email and Password"
                  });
               }
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
};

exports.logout = (req, res) => {
   res.clearCookie("token");
   return res.json({
      message: "User signout successfully"
   });
};
