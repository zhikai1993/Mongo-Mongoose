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
  //everyone we are drop a collections, we are killing are the indices as well
  drivers.drop()
  // next line will ensure that after we drop the collections, we are creating the indices back in
    .then(() => drivers.ensureIndex({'geometry.coordinates': '2dsphere'}))
    .then(() => done())
    .catch(() => done()); //this catach will happen when first time drop when db is empty
})
