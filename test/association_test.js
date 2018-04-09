const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});
    comment = new Comment({content: 'Congrats on great post'});

    joe.blogPosts.push(blogPost); // even though we push an instance, it will be able to figure out form its ObjectId
    blogPost.comments.push(comment);
    comment.user = joe;

    // combine all three promise of save() into an array and handle them all
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  // it.only() will only run this particular test and thsi will come in handy when you have tons of tests
  it('saves a relation between a user, blogpost', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts') // this is the modifier, the argumemt is the property name in user.js
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a relation between a user, blogpost, comment', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts', //path works kindof the same way as 27
        model: 'blogPost',
        populate: { //inside the path in line 37, start populate properites from line 37 property
          path: 'comments',
          model: 'comment', // help with find Model first
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
