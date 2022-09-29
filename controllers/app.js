// dotenv
require('dotenv').config()

/**
 *  @description api for application Name
 *  @method GET /app/title
 */
 exports.title = (req, res) => {
    res.send({
       title: process.env.APP_NAME
    });
 };