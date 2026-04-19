const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    // DONE: Define the post fields for this schema.
    // Fields:
    // - title: String, required, trim
    // - content: String, required, trim
    // - author: String, required, trim
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // DONE: Keep timestamps enabled.
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);