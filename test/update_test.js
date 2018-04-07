const assert = require('assert');
const User = require('../src/user');

describe ('Updating an Object/objects in four different ways: ', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe', likes: 0});
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length == 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('Instance method set and save',(done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('Instance method update',(done) => {
    assertName(joe.update({name: 'Alex'}), done);
  });

  it('Class method update',(done) => {
    assertName(
      User.update({name: 'Joe'}, {name: 'Alex'}),
      done
    );
  })

  it('Class method findOneAndUpdate',(done) => {
    assertName(
      User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
      done
    );
  })

  it('Class method findByIdAndUpdate',(done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
      done
    );
  })

  it("Mongo Operator 'Inc' increments postNumber by 1", (done) => {
    User.update({name: 'Joe'}, {$inc: {likes: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.likes === 1);
      });
      done();
  });
});
