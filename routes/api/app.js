const app = require("express").Router(); // ** router
const controller = require("../../controllers/app"); // ** controllers for polls

/**
 *  @description API for app title
 *  @method GET /app/title
 */
 app.get("/app/title", controller.title);

module.exports = app;