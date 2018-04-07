const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it ('find a user with particular id', (done) => {
    User.findOne({ _id: joe._id})
      .then((user) => {
        console.log("first 'it': " + joe._id);
        assert(user.name === 'Joe');
        done();
      });
  });

  it('finds all users with a name of joe',(done) => {
    User.find({name: 'Joe'})
      .then((users) => {
        //console.log(users.length);
        console.log("second 'it': " + users[0]._id); // this is an object
        console.log("second 'it': " + joe._id); // this is an object as well

        //directly compare will fail because we are comparing two objects
        // assert(users[0]._id === joe._id)
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });
});
