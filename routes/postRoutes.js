const express = require('express');
const postRouter = express.Router()
const Post = require('../schemas/post.js')

//show all posts on the board in createdAt time order (use mongodb find method to get only title, name, date )
postRouter.get('/', async (req, res) => {

  try {
    const showAll = await Post.find({}, { "_id": true, "username": true, "title": true, "createdAt": true }).sort({ "createdAt": -1 })
    return res.json(showAll)

  } catch (error) {

    return res.status(500).json({ error: 'there is no data yet' })

  }
});


//show post by postId (req.param)
postRouter.get('/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const showOne = await Post.findById({ _id }, { "_id": true, "username": true, "title": true, "contents": true, "createdAt": true })
    return res.json(showOne)

  } catch (error) {

    return res.status(400).json({ error: 'requested parameter is not found' })

  }



})

// make a post 
postRouter.post("/", async (req, res) => {
  const { username, pw, title, contents } = req.body;
  console.log(username, title, pw, contents)
  try {
    const posts = await Post.create({ username, pw, title, contents })
    console.log(posts)
    return res.status(200).json(posts)

  } catch (error) {
    return res.status(400).json({ error: 'error has occured' })
  }

});

// update a specific post by postId
postRouter.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { pw, contents } = req.body;
    const checkId = await Post.findById({ _id });
    //check if entered pw is matching
    if (pw !== checkId.pw) {
      return res.status(400).json({ message: "something went wrong" })
    }
    await Post.findOneAndUpdate({ _id }, { $set: { contents } });
    return res.json({ message: "post is updated" })
  } catch (error) {
    return res.status(400).json({ message: "error" })
  }

})

// delete a specific post by postId
postRouter.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { pw } = req.body;
    const checkId = await Post.findById({ _id });
    //check if entered pw is matching
    if (pw !== checkId.pw) {
      return res.status(400).json({ message: "something went wrong" })
    }
    await Post.deleteOne({ _id });
    return res.json({ message: "post is deleted" })
  } catch (error) {
    return res.status(400).json({ message: "error" })
  }
});


module.exports = postRouter

