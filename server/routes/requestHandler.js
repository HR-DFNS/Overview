const cassandradb = require('./../../db/cassandradb.js')
const mongodb = require('./../../db/mongodb.js');
const postgresdb = require('./../../db/postgresdb.js')
const redis = require('redis');
const redisCache = require('../redisCache.js')

const redisClient = redis.createClient(6379,'54.215.135.80');


const actions = {
  mongo: {
    GET: function respondToGETRequest(req, res) {

      mongodb.findOneById(req.params.id, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          console.log(result)
          res.send(result);
          redisCache.cache(result)
        }
      });
    }
  },

  postgres: {
    GET: function respondToGETRequest(req, res) {
      postgresdb.findOneById(req.params.id, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          //postgres doesn't do camelCasing so the result is not what front
          //end exects. Corrected sets the properties on the results to camel casing
          const corrected = result.rows
          corrected[0]['zagatDecor'] = corrected[0]['zagatdecor']
          corrected[0]['zagatFood'] = corrected[0]['zagatfood']
          corrected[0]['zagatService'] = corrected[0]['zagatservice']
          corrected[0]['longDescription'] = corrected[0]['longdescription']
          res.send(corrected);
          redisCache.cache(corrected)
        }
      });
    }
  },

  cassandra: {
    GET: function respondToGETRequest(req, res) {
      cassandradb.findOneById(req.params.id, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          const corrected = result.rows
          corrected[0]['zagatDecor'] = corrected[0]['zagatdecor']
          corrected[0]['zagatFood'] = corrected[0]['zagatfood']
          corrected[0]['zagatService'] = corrected[0]['zagatservice']
          corrected[0]['longDescription'] = corrected[0]['longdescription']
          res.send(corrected);
          redisCache.cache(corrected)
        }
      });
    }
  },
};

const mongoRequestHandler = (req, res) => {
  if (actions.mongo[req.method]) {
    actions.mongo[req.method](req, res);
  } else {
    res.sendStatus(404);
  }
};

const postgresRequestHandler = (req, res) => {
  if (actions.postgres[req.method]) {
    actions.postgres[req.method](req, res);
  } else {
    res.sendStatus(404);
  }
};

const cassandraRequestHandler = (req, res) => {
  if (actions.cassandra[req.method]) {
    actions.cassandra[req.method](req, res);
  } else {
    res.sendStatus(404);
  }
};

module.exports.mongoRequestHandler = mongoRequestHandler
module.exports.postgresRequestHandler = postgresRequestHandler
module.exports.cassandraRequestHandler = cassandraRequestHandler
module.exports.client = redisClient
