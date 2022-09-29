const app = require("express").Router(); // ** router
const controller = require("../../controllers/auth"); // ** controllers for polls
const multer = require('../../middlewares/parser');

/**
 *  @description API for login
 *  @method POST /view
 */
 app.post("/login", controller.userlogin);

 /**
  *  @description API for logout
  *  @method GET /logout
  */
 app.get("/logout", controller.logout);


module.exports = app;
