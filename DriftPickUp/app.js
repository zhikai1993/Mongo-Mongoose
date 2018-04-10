const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

//the envirnoment variable NODE_ENV determines which db to connect to
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/DriftPickUp');
}

app.use(bodyParser.json()); //middleware
routes(app);

/* this will behave like a middleware
    err, req, res are objects
    next is a function that enables the 'app' to go the next middleware when called.
*/
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

module.exports = app;
