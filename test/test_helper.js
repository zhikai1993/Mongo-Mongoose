const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //ES6 Promise

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => {done();})
    .on('error', () => {
      console.warn('Warning', error);
    });
});


beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    mongoose.connection.collections.blogposts.drop(() => {
      mongoose.connection.collections.comments.drop(() => {
        done();
      });
    });
  });
});
