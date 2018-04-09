const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it really is'});

    joe.blogPosts.push(blogPost); // even though we push an instance, it will be able to figure out form its ObjectId

    // combine all three promise of save() into an array and handle them all
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      })
  });
});
