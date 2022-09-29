const app = require("express").Router()
const controller = require("../../../controllers/home/status/index")

/**
 *  @description API for Adding status in home
 *  @method POST /add-new
 */
app.get("/view", controller.globalMetrics)

module.exports = app
