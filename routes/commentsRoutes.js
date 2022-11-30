const express = require('express');
const { update } = require('../schemas/comments.js');
const commentsRouter = express.Router()
const Comment = require('../schemas/comments.js')
const Post = require('../schemas/post.js')

// 
commentsRouter.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const showAll = await Comment.find({ postId }, { "_id": true, "username": true, "comment": true, "createdAt": true }).sort({ "createdAt": -1 });
    return res.json(showAll)
  } catch (error) {
    return res.status(400).json({ error: "error occured" })
  }

});

// create a new comment in a post
commentsRouter.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { username, pw, comment } = req.body;

  if (comment === "") {
    return res.status(400).json({ error: "enter a comment" })
  }
  try {
    const createComment = await Post.findById(postId);
    if (createComment === null) {
      return res.status(400).json({ error: "no post" })
    }

    const create = await Comment.create({ username, pw, comment, postId });
    console.log(create)
    return res.status(201).json({ success: "comment is created" })
  }
  catch (error) {
    return res.status(400).json({ error: "error occurred" })
  }

});
// update a specific comment by postId
commentsRouter.put('/:_commentId', async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  if (comment === "") {
    return res.status(400).json({ error: "enter a comment" })
  }
  try {
    const updateComment = await Comment.findOneAndUpdate({ commentId }, { $set: { comment } });
    return res.status(200).json({ success: "comment is updated" })
  }
  catch (error) {
    return res.status(400).json({ error: "error occurred" })
  }

});
// delete a specific comment by postId
commentsRouter.delete('/:_postId', async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  try {
    const deleteComment = await Comment.deleteOne({ commentId });
    return res.status(200).json({ success: "comment is deleted" })

  } catch (error) {
    return res.status(400).json({ error: "error occured" })
  }

});


module.exports = commentsRouter