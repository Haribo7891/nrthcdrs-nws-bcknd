const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    requied: true
  },
  belongs_to: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    default: 0
  },
  created_by: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model('articles', ArticleSchema);
