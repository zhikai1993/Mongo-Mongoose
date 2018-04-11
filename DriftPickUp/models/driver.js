const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {type: String, default: 'Point'},
  coordinates: {type: [Number], index: '2dsphere'}
  //the index on line 6 tells mongodb that this is a very special property
  //that it should keep track of and considered to be a index that can be used
  //for geojson type queries
});

const DriverSchema = new Schema({
  email: {
    type: String,
    requried: true
  },

  driving: {
    type: Boolean,
    default: false
  },

  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
