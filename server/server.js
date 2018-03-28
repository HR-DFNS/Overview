const nr = require('newrelic');
const cassandra = require('cassandra-driver');
const mongoose = require('mongoose');
const { Client } = require('pg');
const redis = require('redis');
const app = require('./app');

const dbAddress = process.env.DB_ADDRESS || 'localhost';


// mongoose.connect(`mongodb://${dbAddress}/wegot`);
mongoose.connect(`mongodb://54.183.209.246/wegot`);

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
