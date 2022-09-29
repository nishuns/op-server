const express = require('express');
const multer = require("../../middlewares/multer");
const app = express.Router();

app.use('/', require('./auth'));
app.use('/', require('./main'));
app.use('/admin', require('./admin/index'));
app.use('/home', require('./home/index'));

module.exports = app;
~                       