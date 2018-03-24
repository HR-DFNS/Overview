const cassandra = require('cassandra-driver');
const mongoose = require('mongoose');
const nr = require('newrelic');
const { Client } = require('pg');
const redis = require('redis');
const app = require('./app');

const dbAddress = process.env.DB_ADDRESS || 'localhost';
//redis
// const client = redis.createClient(6379);

// =============================================================== //
// ===== Mongo ======= //
// =============================================================== //

mongoose.connect(`mongodb://${dbAddress}/wegot`);
// mongoose.connect(`mongodb://18.220.15.167/wegot`);
// =============================================================== //
// ===== Mongo ======= //
// =============================================================== //

// =============================================================== //
// ===== postgres ======= //
// =============================================================== //
// const client = new Client({
//   user: 'bmblumenfeld',
//   host: 'localhost',
//   database: 'wegot',
//   port: 5432,
// })

// const client = new Client({
//   user: 'postgres',
//   host: '18.216.37.254',
//   database: 'template1',
//   port: 5432,
// })

// client.connect()
// =============================================================== //
// ===== postgres ======= //
// =============================================================== //

// =============================================================== //
// ===== cassandra ======= //
// =============================================================== //

// var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'wegot'});

// =============================================================== //
// ===== cassandra ======= //
// =============================================================== //


app.listen(3002, () => {
  console.log('Listening on port 3002');
});

// =============================================================== //
// ===== webpack lines commented for proxy server purposes ======= //
// =============================================================== //
//why would you need these things?

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('../webpack.config.js');

// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }));
