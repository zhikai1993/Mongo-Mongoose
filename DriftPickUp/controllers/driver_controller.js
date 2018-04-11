const Driver = require('../models/driver'); // refer to driver_controller line 8

module.exports = {

  greeting(req, res) {
    res.send({hi: 'there'});
  },

  index(req, res, next) {
    //get request does not contain 'body'
    // the query contains lng, lat in the url
    // note: the object proeprty lng and lat will be String because express does not know which type to store
    const {lng, lat} = req.query;

    Driver.find({
        'geometry.coordinates': {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                $maxDistance: 200000
            }
        }
    })
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body; //this will be the email object

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      // this will be run when there is an error and
      // if we catch and call next to go to next middleware in app.js
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id; // this corresponding to routes ':id'
    const driverProps = req.body;

    Driver.findByIdAndUpdate({_id : driverId}, driverProps)
      .then(() => Driver.findById({ _id: driverId}))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({_id: driverId})
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
