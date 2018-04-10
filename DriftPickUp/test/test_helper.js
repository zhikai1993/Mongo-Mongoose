const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/DriftPickUp_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.console.warn(('Warning', error));
    });
});

beforeEach(done => {
  const {drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done()); //this catach will happen when first time drop when db is empty
})
