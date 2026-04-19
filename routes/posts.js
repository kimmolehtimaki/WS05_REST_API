const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  // Solution: -Create a new Post instance from req.body.
  // -Save it to MongoDB.
  // -Return the created post with status code 201.
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  // Solution: -Query all posts from MongoDB.
  // -Return the results as JSON.
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  // Solution: -Validate req.params.id using isValidObjectId().
  // -Find one post by id.
  // -Return 404 if the post is not found.
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    return res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  // Solution: -Validate req.params.id using isValidObjectId().
  // -Update the post with req.body.
  // -Return the updated post as JSON.
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Blog ID must be unique' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  // Solution: 
  // - Validate req.params.id using isValidObjectId().
  // - Delete the post by id.
  // - Return a success message as JSON.
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted succesfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;