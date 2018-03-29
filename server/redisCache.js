const redis = require('redis');
const r = require('./routes/requestHandler.js');
const Promise = require('bluebird');
const mongodb = require('./../db/mongodb.js');
const letItRain = Promise.promisify(mongodb.getTopRated)
// const chill = Promise.promisify(r.client.setex);


const getTopRated = async function () {
	var topRatedIds = [];
	await letItRain().then(async function(data) {
  await Promise.map(data,function(element){
	  	topRatedIds.push(element.id)
	  })
  //.then this when you have time so that all the promises within promise.map can be resolved
	})
	return topRatedIds;
}

const cacheTopRated = async function () {
	await letItRain().then(async function(data) {
	  await Promise.map(data,function(element){
	  	r.client.setex(`${element.id}`, 8000, JSON.stringify(element));
	  })
	})
}


module.exports = {

	retreive: function (req, res, next) {
	  const restaurant = req.params.id;
	  r.client.get(restaurant, function (err, data) {
	    if (err) {
	    	throw err;
	    } 
	    if (data != null) {
	      res.send(data);
	    } else {
	      next();
	    }
		});
	},
	cache: function (data) {
		if ((data[0].priceLevel === 2) && ((data[0].zagatFood + data[0].zagatDecor + data[0].zagatService) / 3 >= 4)) {
			r.client.setex(`${data[0].id}`, 604800, JSON.stringify(data));
		}
		r.client.setex(`${data[0].id}`, 5, JSON.stringify(data));
	}
}

module.exports.getTopRated = getTopRated
