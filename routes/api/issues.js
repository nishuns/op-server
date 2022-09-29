const app = require("express").Router();
const controller = require("../../controllers/issues");
const multer = require("../../middlewares/parser");

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
app.post("/add", multer.none(), controller.add);

/**
 *  @description API for updating user
 *  @method PUT /upate
 */
app.put("/update/:id", multer.none(), controller.update);

/**
 *  @description API for opinions
 *  @method PUT /upate
 */
app.put("/update/opinion/:id", multer.none(), controller.updateOpinions);

/**
 *  @description API for deleting user
 *  @method DELETE /delete
 */
app.delete("/delete/:id", controller.delete);

module.exports = app;
