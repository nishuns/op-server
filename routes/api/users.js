const app = require("express").Router();
const controller = require("../../controllers/users");
const multer = require('../../middlewares/parser');

/**
 *  @description API for viewing users
 *  @method POST /view
 */
app.get("/view", controller.view);

/**
 *  @description API to view selected user
 *  @method POST /add
 */
app.get("/view/:id", controller.viewOne);

/**
 *  @description API for adding user
 *  @method POST /add
 */
app.post("/add", controller.add);

/**
 *  @description API for updating user
 *  @method PUT /upate
 */
app.put("/update/:id", controller.update);

/**
 *  @description API for deleting user
 *  @method DELETE /delete
 */
app.delete("/delete/:id", controller.delete);

module.exports = app;
