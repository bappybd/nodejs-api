const express = require("express");
const indexRouter = express.Router();

// Api
indexRouter.use('/api', require('./api'));
module.exports = indexRouter;
