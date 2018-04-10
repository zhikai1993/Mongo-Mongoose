const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

// this will generate an error along because the driver model was not executed
// which means it needs to be acquired somewhere so that 'driver' model is instantiated
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers create a new driver', done => {
    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')
        // this will be the body of the request
        .send({ email: 'test@test.com' }) // make a post request and also along this information to the server
        .end(() => {
          Driver.count().then(newCount => {
            console.log('I am here');
            assert(count === newCount);
            done();
          });
        });
    });
  });
});
