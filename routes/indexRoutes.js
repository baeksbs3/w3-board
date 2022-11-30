const express = require('express');
const indexRouter = express.Router();


//require post and comment routesr here. this file will be the index of all routes used in the app 

const commentsRouter = require('./commentsRoutes.js');
const postsRouter = require('./postRoutes.js');


indexRouter.use("/post", postsRouter);
indexRouter.use("/comments", commentsRouter);

module.exports = indexRouter;