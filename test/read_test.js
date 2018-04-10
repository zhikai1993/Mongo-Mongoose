const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    maria = new User({name: 'Maria'});
    alex = new User({name: 'Alex'});
    zach = new User({name: 'Zach'});

    Promise.all([alex.save(), maria.save(), zach.save(), joe.save()])
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

  //pagination sku and limit
  it ('can skip and limit the result set', (done) => {
    User.find({})
      .sort({name: 1}) // sort depends the property 'name', and '1' stands for ascending order
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maira');
        done();
      })
  })
});
