const nr = require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const handler = require('./routes/requestHandler.js');
const redisCache = require('./redisCache.js')


const app = express();

app.use(cors());
// app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s');
});

app.use('/restaurants/:id', express.static('client/dist'));

//routing with redis caching
app.get('/api/restaurants/:id/overview', redisCache.retreive, handler.mongoRequestHandler);
//routing with out redis caching 
// app.get('/api/restaurants/:id/overview', handler.mongoRequestHandler);

module.exports = app;

