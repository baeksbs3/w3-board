const express = require('express');
const postRouter = express.Router();
const Post = require('../schemas/post.js');

//show all posts on the board in createdAt time order (use mongodb find method to get only title, name, date )
postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}, { "_id": true, "username": true, "title": true, "createdAt": true }).sort({ "createdAt": -1 })
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'error occured' })
  }
});


//show post by postId (req.param)
postRouter.get('/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await Post.findById({ _id }, { "_id": true, "username": true, "title": true, "contents": true, "createdAt": true })
    return res.json({posts})
  } catch (error) {
    return res.status(500).json({ error: 'error occured' })
  }
});

// create a post 
postRouter.post("/", async (req, res) => {
  const { username, pw, title, contents } = req.body;
  try {
    const post = await Post.create({ username, pw, title, contents })
    return res.status(200).json({post})
  } catch (error) {
    return res.status(500).json({ error: 'error occured' })
  }
});

// update a specific post by postId
postRouter.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { pw, contents } = req.body;
    const updatePost = await Post.findById({ _id });

    if (pw !== updatePost.pw) {
      return res.status(400).json({ message: "something went wrong, try again" })
    }
    await Post.findOneAndUpdate({ _id }, { $set: { contents } });
    return res.json({ message: "post is updated" })
  } catch (error) {
    return res.status(500).json({ message: "error occured" })
  }
});

// delete a specific post by postId
postRouter.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { pw } = req.body;
    const deletePost = await Post.findById({ _id });

    if (pw !== deletePost.pw) {
      return res.status(400).json({ message: "something went wrong" })
    }
    await Post.deleteOne({ _id });
    return res.json({ message: "post is deleted" })
  } catch (error) {
    return res.status(500).json({ message: "error" })
  }
});


module.exports = postRouter

