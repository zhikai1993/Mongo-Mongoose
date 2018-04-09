const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment' //this correspondsing to the 'comment' in database model, refer line 13 to better understand
  }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
