const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

// this will generate an error along because the driver model was not executed
// which means it needs to be acquired somewhere so that 'driver' model is instantiated
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST to /api/drivers create a new driver', done => {
    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')
        // this will be the body of the request
        .send({ email: 'test@test.com' }) // make a post request and also along this information to the server
        .end(() => {
          Driver.count().then(newCount => {
            //console.log('I am here');
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('PUT to /api/driver/:id edits an existing driver', done => {
    const driver = new Driver({email: 't@t.com', driving :false});
    driver.save().then(() => {
      request(app)
        //old style .put('/api/drivers/' + driver._id)
        /*ES 6 style*/
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 't@t.com'})
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
        });
    });
  });

  it('DELETE to api/drivers/:id can delete a driver', done => {
    const driver = new Driver({ email: 'test@test.com'});

    driver.save().then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({email: 'test@test.com'})
              .then((driver) => {
                assert(driver === null);
                done();
              });
          });
    });
  });
});
