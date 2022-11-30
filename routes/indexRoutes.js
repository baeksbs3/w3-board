// read posts and comments 

const express = require('express')
const indexRouter = express.Router()


//require poste route and comment route here. this will be the index pg of all the routes 

const commentsRouter = require('./commentsRoutes.js')
const postsRouter = require('./postRoutes.js')



indexRouter.use("/post", postsRouter);
indexRouter.use("/comments", commentsRouter);

module.exports = indexRouter;