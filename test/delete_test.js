const assert = require('assert');
const User = require('../src/user');

describe ('Deleting an object/objects in four different ways: ', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('instance remove() method', (done) => {
    joe.remove()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user == null);
        done();
      });
  });

  // this remove method can remove one or more depend upon criteria
  it('class method remove() method', (done) => {
    User.remove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user == null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user == null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user == null);
        done();
      });
  });
});
