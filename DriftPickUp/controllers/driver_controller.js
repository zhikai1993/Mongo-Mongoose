const Driver = require('../models/driver'); // refer to driver_controller line 8

module.exports = {

  greeting(req, res) {
    res.send({hi: 'there'});
  },

  create(req, res) {
    console.log(req.body);
    res.send({hi: 'there'});
  }
};
